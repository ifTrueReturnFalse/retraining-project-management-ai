import { NextRequest, NextResponse } from "next/server";
import { externalApi } from "@/lib/axios-server";
import { ProjectCreateApiResponse, ProjectGetAllApiResponse } from "@/models/project.model";
import { isAxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const api = await externalApi();

    const { data: payload } = await api.post<ProjectCreateApiResponse>(
      "/projects",
      body,
    );

    if (!payload.success) {
      return NextResponse.json(
        { error: "Erreur lors de la création du projet." },
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

export async function GET() {
  try {
    const api = await externalApi();

    const { data: payload } =
      await api.get<ProjectGetAllApiResponse>("/projects");

    if (!payload.success) {
      return NextResponse.json(
        { error: "Erreur lors de la récupération des projets." },
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
