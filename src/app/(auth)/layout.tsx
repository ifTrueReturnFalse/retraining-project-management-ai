import React from "react";
import Image from "next/image";
import styles from "./auth-layout.module.css";

export default function AuthLayout({
  children,
  photo,
}: {
  children: React.ReactNode;
  photo: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
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
      <section className={styles.backgroundPhoto}>{photo}</section>
    </main>
  );
}
