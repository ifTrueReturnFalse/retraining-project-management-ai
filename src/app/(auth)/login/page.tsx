"use client";

import Link from "next/link";
import styles from "./login.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import routes from "@/utils/routes";
import { useState } from "react";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ApiError } from "@/models/api.model";
import { useUser } from "@/context/UserContext";

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {setUser} = useUser()

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(credentials);
      setUser(response.user)
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`Erreur : ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Connexion</h1>
        <TextInput
          label="Email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />

        <TextInput
          label="Mot de passe"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />

        <Button textButton="Se connecter" isSubmit={true} disabled={loading} />
        {error && <p>{error}</p>}
        <Link href={routes.LOGIN}>Mot de passe oublié ?</Link>
      </form>

      <p>
        Pas encore de compte ? <Link href={routes.SIGNIN}>Créer un compte</Link>
      </p>
    </div>
  );
}
