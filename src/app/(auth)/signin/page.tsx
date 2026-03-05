import Link from "next/link";
import styles from "./signin.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Inscription</h1>
        <TextInput label="Email" />

        <TextInput label="Mot de passe" type="password" />

        <Button textButton="S'inscrire" />
      </form>

      <p>
        Déjà inscrit ? <Link href={"/login"}>Se connecter</Link>
      </p>
    </div>
  );
}
