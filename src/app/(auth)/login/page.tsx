"use client";

import Link from "next/link";
import styles from "./login.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import routes from "@/utils/routes";
import { useState } from "react";
import { authService } from "@/services/auth.client.service";
import { useRouter } from "next/navigation";
import { ApiError } from "@/models/api.model";
import { useUser } from "@/context/UserContext";

/**
 * LoginPage component handles user authentication.
 * It provides a form for email and password, manages local state for credentials,
 * and interacts with the authService to log the user in.
 */
export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const router = useRouter();

  /**
   * Updates the credentials state when an input field value changes.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles the form submission.
   * Prevents default behavior, calls the login service, updates global user context,
   * and redirects the user to the dashboard upon success.
   * @param {React.SubmitEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await authService.login(credentials);
      // Update global user state with the returned user data
      setUser(response.user);
      // Force a refresh to ensure middleware/server components recognize the new session cookie
      router.refresh();
      // Small delay to ensure state/cookies are processed before navigation
      window.setTimeout(() => {
        router.push("/dashboard");
      }, 50);
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
