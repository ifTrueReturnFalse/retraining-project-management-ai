import Link from 'next/link'
import styles from './login.module.css'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h1>Connexion</h1>
        <label htmlFor="">Email</label>
        <input type="text" name="" id="" />

        <label htmlFor="">Mot de passe</label>
        <input type="password" name="" id="" />

        <button type="submit">Se connecter</button>
        
        <Link href={"/login"}>Mot de passe oublié ?</Link>
      </form>

      <p>
        Pas encore de compte ? <Link href={"/signin"}>Créer un compte</Link>
      </p>
    </div>
  )
}