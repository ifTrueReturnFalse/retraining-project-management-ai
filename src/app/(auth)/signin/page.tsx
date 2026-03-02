import Link from "next/link";
import styles from "./signin.module.css";

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Inscription</h1>
        <label htmlFor="">Email</label>
        <input type="text" name="" id="" />

        <label htmlFor="">Mot de passe</label>
        <input type="password" name="" id="" />

        <button type="submit">S&apos;inscrire</button>
      </form>

      <p>
        Déjà inscrit ? <Link href={"/login"}>Se connecter</Link>
      </p>
    </div>
  );
}
