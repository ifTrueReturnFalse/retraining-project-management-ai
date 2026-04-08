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
import { toast } from "sonner";

export default function AccountPage() {
  const { user, setUser } = useRequiredUser();
  const {
    register,
    handleSubmit,
    setValue,
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
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: UserAccountInputFront) => {
    try {
      setIsLoading(true)
      const { name, familyName, email, oldPassword, newPassword } = data;

      if (user.name !== `${name} ${familyName}` || user.email !== email) {
        const payload = {
          name: `${name} ${familyName}`,
          email,
        };

        const response = await authService.updateProfile(payload);

        if (response.success) {
          setUser(response.data.user);
          toast.success("Mise à jour du profil réussie !")
        } else {
          toast.error("Echec de la mise à jour du profil")
        }
      }

      if (oldPassword.length > 0 && newPassword.length > 0) {
        const payload = {
          currentPassword: oldPassword,
          newPassword,
        };

        const response = await authService.updatePassword(payload);

        if (!response.success) {
          toast.error(response.message)
        } else {
          toast.success(response.message)
          setValue("oldPassword", "")
          setValue("newPassword", "")
          setValue("newPasswordVerification", "")
        }
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(error.message)
      } else {
        toast.error("Une erreur est survenue lors de la mise à jour de votre profil")
      }
    } finally {
      setIsLoading(false)
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

        <Button textButton="Modifier les informations" className={styles.updateButton} isSubmit={true} disabled={isLoading} />
      </form>
    </section>
  );
}
