import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
