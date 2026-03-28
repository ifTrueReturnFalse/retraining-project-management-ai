import { externalApi } from "@/lib/axios-server";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { TaskApiResponse } from "@/models/tasks.model";

type RouteContext = {
  params: Promise<{
    projectId: string;
    taskId: string;
  }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  try {
    const { projectId, taskId } = await context.params;
    const body = await request.json();
    const api = await externalApi();

    const { data: payload } = await api.put<TaskApiResponse>(
      `/projects/${projectId}/tasks/${taskId}`,
      body,
    );
    console.log(payload)
    if (!payload.success) {
      return NextResponse.json(payload, { status: 400 });
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
