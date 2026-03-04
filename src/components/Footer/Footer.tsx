import styles from "./Footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Image
        src={"/images/logo/black-logo.svg"}
        alt="Logo"
        width={100}
        height={13}
      />
      <p>Abricot 2025</p>
    </footer>
  );
}
