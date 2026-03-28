import { NextRequest, NextResponse } from "next/server";
import { Project, ProjectApiResponse } from "@/models/project.model";
import { isAxiosError } from "axios";
import { externalApi } from "@/lib/axios-server";

type RouteContext = {
  params: Promise<{ projectId: Project["id"] }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { projectId } = await context.params;
    const api = await externalApi();

    if (!projectId) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 404 },
      );
    }

    const { data: payload } = await api.get<ProjectApiResponse>(
      `/projects/${projectId}`,
    );

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
