import { NextRequest, NextResponse } from "next/server";
import { GenerateTasksInput } from "@/models/tasks.model";
import { llamaIndexService } from "@/lib/llamaindex";
import { ApiError } from "@/models/api.model";
import { hasStatus } from "@/lib/handleError";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateTasksInput = await request.json();

    const { project, tasks, userRequest } = body;

    if (!project || !userRequest) {
      return NextResponse.json(
        { message: "Un prompt et un projet sont requis" },
        { status: 400 },
      );
    }

    const response = await llamaIndexService.generateTasks(
      { project, tasks },
      userRequest,
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          details: error.details,
        },
        { status: error.status },
      );
    }

    if (hasStatus(error)) {
      if (error.status === 429) {
        return NextResponse.json(
          { success: false, message: "Limite de requêtes Mistral atteinte" },
          { status: 429 },
        );
      }

      return NextResponse.json(
        { success: false, message: error.message || "Erreur API" },
        { status: error.status },
      );
    }

    if (error instanceof Error) {
      console.error("Crash interne:", error.message);
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Un problème inconnu est survenu.",
        details: [],
      },
      { status: 500 },
    );
  }
}
