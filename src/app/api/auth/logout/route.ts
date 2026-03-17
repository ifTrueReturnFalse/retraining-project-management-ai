import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logged out" },
      { status: 200 },
    );
    response.cookies.delete("auth_jwt");
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
