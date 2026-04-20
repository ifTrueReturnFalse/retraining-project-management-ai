import React from "react";
import Image from "next/image";
import styles from "./auth-layout.module.css";

/**
 * Layout component for authentication pages (Login, Register, etc.).
 * It uses Next.js Parallel Routes to display a form alongside a background photo.
 * 
 * @param {React.ReactNode} props.children - The main content (usually the auth form).
 * @param {React.ReactNode} props.photo - The parallel route slot content (defined in @photo directory).
 * @returns {JSX.Element} A split-screen layout with a form section and a visual section.
 */
export default function AuthLayout({
  children,
  photo,
}: {
  children: React.ReactNode;
  photo: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      {/* Left/Top section containing the brand logo and the authentication form */}
      <section className={styles.formContainer}>
        <Image
          src={"/images/logo/orange-logo.svg"}
          alt="logo"
          width={256}
          height={32}
          loading="eager"
        />
        {children}
      </section>
      {/* Right/Bottom section displaying the parallel 'photo' route content */}
      <section className={styles.backgroundPhoto}>{photo}</section>
    </main>
  );
}
