import { NextResponse } from "next/server";
import { externalApi } from "@/lib/axios-server";
import { UserLoginResponse } from "@/models/auth.model";
import { isAxiosError } from "axios";

const ONE_DAY = 60 * 60 * 24;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const api = await externalApi();

    const { data: payload } = await api.post<UserLoginResponse>(
      "/auth/login",
      body,
    );
    const response = NextResponse.json(payload);

    if (payload.success) {
      response.cookies.set("auth_jwt", payload.data.token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: ONE_DAY,
      });
    }

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
