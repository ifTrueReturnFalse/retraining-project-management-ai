import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import routes from "./utils/routes";

/**
 * Middleware proxy function to handle authentication and route protection.
 * 
 * @param request - The incoming Next.js request object.
 * @returns A NextResponse that either redirects the user or allows the request to proceed.
 */
export function proxy(request: NextRequest) {
  // Retrieve the JWT from cookies to check authentication status
  const token = request.cookies.get("auth_jwt")?.value;
  const { pathname } = request.nextUrl;

  /**
   * List of routes that require a valid authentication token.
   */
  const protectedRoutes = [
    routes.DASHBOARD,
    routes.PROJECT_LIST,
    routes.ACCOUNT,
  ];

  // Check if the current path matches any of the protected route patterns
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // Redirect to login if accessing a protected route without a token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(routes.LOGIN, request.url));
  }

  // Prevent authenticated users from accessing login or sign-in pages
  if (
    (request.nextUrl.pathname === routes.LOGIN ||
      request.nextUrl.pathname === routes.SIGNIN) &&
    token
  ) {
    // Redirect authenticated users to the dashboard
    return NextResponse.redirect(new URL(routes.DASHBOARD, request.url));
  }

  // Proceed with the request if no redirection rules are met
  return NextResponse.next();
}
