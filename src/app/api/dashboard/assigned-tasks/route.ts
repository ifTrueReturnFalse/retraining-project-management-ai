import { externalApi } from "@/lib/axios-server";
import { TaskApiResponse } from "@/models/tasks.model";
import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

export async function GET() {
  try {
    const api = await externalApi();
    const { data: payload } = await api.get<TaskApiResponse>(
      "/dashboard/assigned-tasks",
    );

    if (payload.success) {
      return NextResponse.json(payload);
    }
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
