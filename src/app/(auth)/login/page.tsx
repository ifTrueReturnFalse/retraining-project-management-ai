import Link from "next/link";
import styles from "./login.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Connexion</h1>
        <TextInput label="Email" />

        <TextInput label="Mot de passe" type="password" />

        <Button textButton="Se connecter" />

        <Link href={"/login"}>Mot de passe oublié ?</Link>
      </form>

      <p>
        Pas encore de compte ? <Link href={"/signin"}>Créer un compte</Link>
      </p>
    </div>
  );
}
