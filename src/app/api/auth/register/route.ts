import { externalApi } from "@/lib/axios-server";
import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { UserLoginResponse } from "@/models/auth.model";

const ONE_DAY = 60 * 60 * 24;

export async function POST(request: NextRequest) {
  try {
    const api = await externalApi();
    const body = await request.json();

    const { data: payload } = await api.post<UserLoginResponse>(
      "/auth/register",
      body,
    );

    if (!payload.success) {
      return NextResponse.json({ message: payload.message }, { status: 400 });
    }

    const response = NextResponse.json(payload);

    response.cookies.set("auth_jwt", payload.data.token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: ONE_DAY,
    });

    return response;
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
