import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { GenerateTasksInput } from "@/models/tasks.model";
import { llamaIndexService } from "@/lib/llamaindex";

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
