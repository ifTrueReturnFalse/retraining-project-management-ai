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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_jwt");
  let user = null;

  if (token) {
    try {
      user = await authServerService.profile();
    } catch {
      user = null;
    }
  }

  return (
    <html lang="fr">
      <body className={`${inter.variable} ${manrope.variable}`}>
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
        <UserProvider initialUser={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
