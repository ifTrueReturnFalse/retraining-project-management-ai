import { externalApi } from "@/lib/axios-server";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { Project } from "@/models/project.model";
import { Task } from "@/models/tasks.model";
import { ApiSuccessResponse } from "@/models/api.model";

type RouteContext = {
  params: Promise<{ projectId: Project["id"]; taskId: Task["id"] }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  try {
    const { projectId, taskId } = await context.params;
    const body = await request.json();
    const api = await externalApi();

    const { data: payload } = await api.post<ApiSuccessResponse>(
      `/projects/${projectId}/tasks/${taskId}/comments`,
      body,
    );

    if (!payload.success) {
      return NextResponse.json(
        { error: "Failed to post your comment." },
        { status: 500 },
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
