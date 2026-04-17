import "server-only";

import { SummaryIndex, Document, Settings } from "llamaindex";
import {
  MistralAI,
  MistralAIEmbedding,
  MistralAIEmbeddingModelType,
} from "@llamaindex/mistral";
import {
  GeneratedTasksResponse,
  TaskGenerationLlama,
} from "@/models/tasks.model";
import { ApiError } from "@/models/api.model";
import { GeneratedTasksResponseSchema } from "@/schemas/tasks.schema";

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

class LlamaIndexService {
  async generateTasks(
    data: TaskGenerationLlama,
    userRequest: string,
  ): Promise<GeneratedTasksResponse> {
    await this.validateIntent(userRequest);

    const documents = this.prepareDocuments(data);

    const index = await SummaryIndex.fromDocuments(documents);
    const queryEngine = index.asQueryEngine();

    const prompt = `
    Tu es un assistant de gestion de projet expert. 
    En te basant sur le contexte fourni, génère des tâches pertinentes pour répondre à la demande : ${userRequest}
    Voici la date actuelle : ${new Date().toISOString()}

    REGLES CRITIQUES :
    1. Analyse les tâches existantes dans le contexte pour ne pas créer de doublons.
    2. Si une tâche demandée existe déjà, ignore la.
    3. Fais attention a ce que les dates fournies soient cohérentes.
    4. Réponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans explication.
    
    STRUCTURE JSON ATTENDUE :
    {
      "tasks": [
        {
          "title": "Titre concis",
          "description": "Description technique",
          "dueDate": "ISO8601 string",
          "status": "TODO" | "IN_PROGRESS" | "DONE",
          "priority": "LOW" | "MEDIUM" | "HIGH",
        }
      ]
    }

    Exemple:
    {
      "tasks": [
        {
          "title": "Mettre en place l'authentification",
          "description": "Implémenter les JWT avec le refresh automatique",
          "dueDate": "2026-05-10T16:50:00.000Z",
          "status": "TODO",
          "priority": "MEDIUM",
        } 
      ]
    }`;

    const response = await queryEngine.query({ query: prompt });

    return this.parseAndValidate(response.toString());
  }

  private async validateIntent(request: string): Promise<void> {
    const check = await Settings.llm.complete({
      prompt: `Réponds par 'OUI' si cette demande concerne la création de tâches ou la gestion de projet, sinon 'NON'. 
      Si la demande est maladroite mais concerne quand même une partie technique, pour l'ajout ou la suppresion d'une fonctionnalité, réponds par "OUI".
      Demande: "${request}"`,
    });

    if (check.text.trim().toUpperCase().includes("NON")) {
      throw new ApiError("Demande hors-sujet détectée.", [], 400);
    }
  }

  private prepareDocuments(data: TaskGenerationLlama): Document[] {
    const documents: Document[] = [];

    documents.push(
      new Document({
        text: `Projet: ${data.project.name}. Description: ${data.project.description}`,
        metadata: { type: "project_info" },
      }),
    );

    if (data.tasks.length > 0) {
      const taskText = data.tasks
        .map((task) => `- [${task.status}] ${task.title}: ${task.description}`)
        .join("\n");

      documents.push(
        new Document({
          text: `Tâches existantes à ne pas dupliquer:\n${taskText}`,
          metadata: { type: "existing_tasks" },
        }),
      );
    }

    return documents;
  }

  private parseAndValidate(rawText: string): GeneratedTasksResponse {
    try {
      const cleanedText = rawText.replace(/```json|```/g, "").trim();
      const json = JSON.parse(cleanedText);
      return GeneratedTasksResponseSchema.parse(json);
    } catch {
      console.error("Erreur de parsing LLM :", rawText);
      throw new ApiError(`Le LLM n'a pas fourni un JSON valide`, [], 500);
    }
  }
}

export const llamaIndexService = new LlamaIndexService();
