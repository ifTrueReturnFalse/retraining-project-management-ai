import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "./utils/routes";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("auth_jwt")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = [
    routes.DASHBOARD,
    routes.PROJECT_LIST,
    routes.ACCOUNT,
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(routes.LOGIN, request.url));
  }

  if (
    (request.nextUrl.pathname === routes.LOGIN ||
      request.nextUrl.pathname === routes.SIGNIN) &&
    token
  ) {
    return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
  }

  return NextResponse.next();
}
