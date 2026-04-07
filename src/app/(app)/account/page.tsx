"use client";

import styles from "./AccountPage.module.css";
import TextInput from "@/components/Inputs/TextInput/TextInput";
import Button from "@/components/Inputs/Button/Button";
import { useRequiredUser } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { UserAccountInputFront } from "@/models/auth.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserAccountInputFrontSchema } from "@/schemas/auth.schema";
import { ApiError } from "@/models/api.model";
import { useState } from "react";
import { authService } from "@/services/auth.client.service";

export default function AccountPage() {
  const { user, setUser } = useRequiredUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserAccountInputFront>({
    resolver: zodResolver(UserAccountInputFrontSchema),
    defaultValues: {
      name: user.name.split(" ")[0],
      familyName: user.name.split(" ")[1],
      email: user.email,
      oldPassword: "",
      newPassword: "",
      newPasswordVerification: "",
    },
  });
  const [globalError, setGlobalError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")

  const onSubmit = async (data: UserAccountInputFront) => {
    setGlobalError("");
    setProfileSuccess("")
    setPasswordSuccess("")
    try {
      const { name, familyName, email, oldPassword, newPassword } = data;

      if (user.name !== `${name} ${familyName}` || user.email !== email) {
        setProfileError("");
        const payload = {
          name: `${name} ${familyName}`,
          email,
        };

        const response = await authService.updateProfile(payload);

        if (response.success) {
          setUser(response.data.user);
          alert('Reussi')
        } else {
          setProfileError(response.message);
        }
      }

      if (oldPassword.length > 0 && newPassword.length > 0) {
        setPasswordError("");
        const payload = {
          currentPassword: oldPassword,
          newPassword,
        };

        const response = await authService.updatePassword(payload);

        if (!response.success) {
          setPasswordError(response.message);
        } else {
          setPasswordSuccess(response.message)
        }
      }
    } catch (error) {
      if (error instanceof ApiError) {
        setGlobalError(error.message);
      } else {
        setGlobalError(
          "Une erreur est survenu lors de la mise à jour du profil.",
        );
      }
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Mon compte</h2>
      <p className={styles.user}>{user.name}</p>

      <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Nom"
          placeholder="Dupont"
          {...register("familyName")}
          error={errors.familyName?.message}
        />

        <TextInput
          label="Prénom"
          placeholder="Amélie"
          {...register("name")}
          error={errors.name?.message}
        />

        <TextInput
          label="Email"
          placeholder="a.dupont@gmail.com"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />

        {profileSuccess && <span>{profileSuccess}</span>}
        {profileError && <span>{profileError}</span>}

        <TextInput
          label="Ancien mot de passe"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          type="password"
          {...register("oldPassword")}
          error={errors.oldPassword?.message}
        />

        <TextInput
          label="Nouveau mot de passe"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          type="password"
          {...register("newPassword")}
          error={errors.newPassword?.message}
        />

        <TextInput
          label="Répéter nouveau mot de passe"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          type="password"
          {...register("newPasswordVerification")}
          error={errors.newPasswordVerification?.message}
        />

        {passwordSuccess && <div>{passwordSuccess}</div>}
        {passwordError && <div>{passwordError}</div>}

        <Button textButton="Modifier les informations" className={styles.updateButton} isSubmit={true}  />

        {globalError && <div className={styles.errors}>{globalError}</div>}
      </form>
    </section>
  );
}
