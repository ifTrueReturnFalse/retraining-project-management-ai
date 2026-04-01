import { externalApi } from "@/lib/axios-server";
import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import { TaskProjectApiResponse } from "@/models/tasks.model";
import { isAxiosError } from "axios";

interface RouteContext {
  params: Promise<{ projectId: Project["id"] }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { projectId } = await context.params;
    const api = await externalApi();

    if (!projectId) {
      return NextResponse.json(
        { error: "Pas de projet trouvé." },
        { status: 404 },
      );
    }

    const { data: payload } = await api.get<TaskProjectApiResponse>(
      `/projects/${projectId}/tasks`,
    );

    if (!payload.success) {
      return NextResponse.json(
        { error: "Echec de la récupération des tâches" },
        { status: 400 },
      );
    }
    
    return NextResponse.json(payload);
  } catch (error) {
    if (isAxiosError(error)) {
      const errorData = error.response?.data;
      if (
        errorData &&
        typeof errorData === "object" &&
        "success" in errorData
      ) {
        return NextResponse.json(errorData, {
          status: error.response?.status || 400,
        });
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Un problème serveur est survenu.",
        details: [],
      },
      { status: 500 },
    );
  }
}
