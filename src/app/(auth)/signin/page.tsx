import Link from "next/link";
import styles from "./signin.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Inscription</h1>
        <TextInput label="Email" isPassword={false} />

        <TextInput label="Mot de passe" isPassword={true} />

        <button type="submit">S&apos;inscrire</button>
      </form>

      <p>
        Déjà inscrit ? <Link href={"/login"}>Se connecter</Link>
      </p>
    </div>
  );
}
