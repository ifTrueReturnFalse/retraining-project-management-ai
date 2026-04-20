"use client";

import Link from "next/link";
import styles from "./signin.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import { useForm } from "react-hook-form";
import { UserRegisterInputFront } from "@/models/auth.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterInputFrontSchema } from "@/schemas/auth.schema";
import { ApiError } from "@/models/api.model";
import { toast } from "sonner";
import { authService } from "@/services/auth.client.service";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import routes from "@/utils/routes";

/**
 * SignInPage component handles new user registration.
 * It utilizes react-hook-form with Zod validation to manage form state,
 * performs the registration via authService, and redirects to the dashboard.
 */
export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterInputFront>({
    resolver: zodResolver(UserRegisterInputFrontSchema),
    defaultValues: {
      name: "",
      familyName: "",
      email: "",
      password: "",
      passwordVerification: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  /**
   * Processes the registration form submission.
   * @param {UserRegisterInputFront} data - The validated form data.
   */
  const onSubmit = async (data: UserRegisterInputFront) => {
    try {
      setIsLoading(true);
      const { email, name, familyName, password } = data;
      
      // Concatenate first and last name to match the backend User schema
      const payload = {
        name: `${name} ${familyName}`,
        email,
        password,
      };

      const response = await authService.register(payload);

      if (!response.success) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        // Update global user context with the newly created user session
        setUser(response.data.user);
        router.refresh();
        // Small timeout to ensure cookies/state are synchronized before navigation
        window.setTimeout(() => {
          router.push(routes.DASHBOARD);
        }, 50);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message);
      } else {
        toast.error(
          "Une erreur est survenue lors de la création de votre compte",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>Inscription</h1>

        <TextInput
          label="Prénom"
          {...register("name")}
          error={errors.name?.message}
        />

        <TextInput
          label="Nom"
          {...register("familyName")}
          error={errors.familyName?.message}
        />

        <TextInput
          label="Email"
          {...register("email")}
          error={errors.email?.message}
        />

        <TextInput
          label="Mot de passe"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />

        <TextInput
          label="Confirmer mot de passe"
          type="password"
          {...register("passwordVerification")}
          error={errors.passwordVerification?.message}
        />

        <Button textButton="S'inscrire" isSubmit={true} disabled={isLoading} />
      </form>

      <p>
        Déjà inscrit ? <Link href={"/login"}>Se connecter</Link>
      </p>
    </div>
  );
}
