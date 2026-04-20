import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { cookies } from "next/headers";
import { authServerService } from "@/services/auth.server.service";
import KeyboardManager from "@/utils/KeyboardManager";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  weight: "400",
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: "600",
});

export const metadata: Metadata = {
  title: "Abricot",
  description: "Your AI project management app",
};

/**
 * Root layout component that wraps the entire application.
 * Handles server-side authentication check and provides global providers.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Retrieve the authentication token from cookies to verify session on the server
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_jwt");
  let user = null;

  if (token) {
    try {
      /** 
       * Fetch user profile from the server service. 
       * This ensures the UI is hydrated with the correct user state immediately.
       */
      user = await authServerService.profile();
    } catch {
      user = null;
    }
  }

  return (
    <html lang="fr">
      <body className={`${inter.variable} ${manrope.variable}`}>
        {/* Global utility for managing keyboard shortcuts/events */}
        <KeyboardManager />
        <Toaster
          visibleToasts={5}
          position="bottom-center"
          toastOptions={{
            classNames: {
              toast: "toast",
              success: "toast-success",
              error: "toast-error",
            },
          }}
        />
        {/* Wrap application in UserProvider to share auth state across client components */}
        <UserProvider initialUser={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
