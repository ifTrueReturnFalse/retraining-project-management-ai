import { NextRequest, NextResponse } from "next/server";
import { externalApi } from "@/lib/axios-server";
import { isAxiosError } from "axios";
import { UserProfileResponse } from "@/models/auth.model";

export async function GET() {
  try {
    const api = await externalApi();

    const { data: payload } =
      await api.get<UserProfileResponse>("/auth/profile");

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

export async function PUT(request: NextRequest) {
  try {
    const api = await externalApi();
    const body = await request.json();

    const { data: payload } = await api.put<UserProfileResponse>(
      "/auth/profile",
      body,
    );

    if (!payload.success) {
      return NextResponse.json({ message: payload.message }, { status: 400 });
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
