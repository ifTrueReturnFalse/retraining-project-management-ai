import "server-only"

import {
  VectorStoreIndex,
  Document,
  SentenceSplitter,
  Settings,
} from "llamaindex";
import {
  MistralAI,
  MistralAIEmbedding,
  MistralAIEmbeddingModelType,
} from "@llamaindex/mistral";
import { GeneratedTasksResponse, TaskGenerationLlama } from "@/models/tasks.model";
import { ApiError } from "@/models/api.model";

const MISTRAL_API_KEY = process.env.MISTRAL_API_KEY;
if (!MISTRAL_API_KEY) throw new Error("MISTRAL_API_KEY missing");

Settings.llm = new MistralAI({
  model: "mistral-large-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

Settings.embedModel = new MistralAIEmbedding({
  model: MistralAIEmbeddingModelType.MISTRAL_EMBED,
  apiKey: process.env.MISTRAL_API_KEY,
});

Settings.nodeParser = new SentenceSplitter({
  chunkSize: 512,
  chunkOverlap: 50,
});

class LlamaIndexService {
  private index: VectorStoreIndex | null = null;

  async indexProjectContext(data: TaskGenerationLlama) {
    const documents: Document[] = [];

    documents.push(
      new Document({
        text: `Projet: ${data.project.name} - Description: ${data.project.description}`,
        metadata: { type: "project_description" },
      }),
    );

    if (data.tasks.length > 0) {
      const taskText = data.tasks
        .map((task) => `- [${task.status}] ${task.title}: ${task.description}`)
        .join("\n");

      documents.push(
        new Document({
          text: `Tâches existantes:\n${taskText}`,
          metadata: { type: "existing_tasks" },
        }),
      );
    }

    this.index = await VectorStoreIndex.fromDocuments(documents);
  }

  async generateTasks(userRequest: string): Promise<GeneratedTasksResponse> {
    if (!this.index) {
      throw new ApiError(
        "Aucun index, appelez indexContextProject d'abord",
        [],
        400,
      );
    }

    const queryEngine = this.index.asQueryEngine({
      similarityTopK: 4,
    });

    const prompt = `Tu es un assistant de gestion de projet. En te basant sur le contexte fourni, génère des tâches pertinentes.
    Demande: ${userRequest}
    IMPORTANT: Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans explication, avec cette structure exacte:
    {
      "tasks": [
        "title": "string",
        "description": "string",
        "dueDate": "string ISO 8601",
        "status": "TODO" | "IN_PROGRESS" | "DONE",
        "priority": "LOW" | "MEDIUM" | "HIGH",
      ]
    }
    Exemple:
    {
      "tasks": [
        "title": "Mettre en place l'authentification",
        "description": "Implémenter les JWT avec le refresh automatique",
        "dueDate": "2026-05-10T16:50:00.000Z",
        "status": "TODO",
        "priority": "MEDIUM",
      ]
    }`;

    const response = await queryEngine.query({ query: prompt });
    const rawText = response.toString();

    try {
      const cleanedText = rawText.replace(/```json\n?|\n?```/g, "").trim();
      return JSON.parse(cleanedText);
    } catch {
      throw new Error(`Le LLM n'a pas fourni un JSON valide: ${rawText}`);
    }
  }
}

export const llamaIndexService = new LlamaIndexService();
