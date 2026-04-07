import { z } from "zod";
import { createApiResponseSchema } from "./api.schema";

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const BasicUserProfileSchema = UserProfileSchema.pick({
  id: true,
  email: true,
  name: true,
});

export const UserLoginSchema = z.object({
  user: UserProfileSchema,
  token: z.string(),
});

export const UserProfileResponseSchema = createApiResponseSchema(
  z.object({ user: UserProfileSchema }),
);

export const UserLoginResponseSchema = createApiResponseSchema(UserLoginSchema);

export const UserAccountInputFrontSchema = z
  .object({
    familyName: z.string().min(1, "Veuillez renseigner votre nom de famille."),
    name: z.string().min(1, "Veuillez renseigner votre prénom."),
    email: z.email("Format email valide"),
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
      .regex(/[A-Z]/, "Il faut au moins une majuscule.")
      .regex(/[0-9]/, "Il faut au moins un chiffre.")
      .or(z.literal("")),
    newPasswordVerification: z.string(),
  })
  .refine((data) => data.newPassword === data.newPasswordVerification, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["newPasswordVerification"],
  })
  .refine(
    (data) => {
      if (data.newPassword && data.oldPassword) {
        return data.newPassword !== data.oldPassword;
      }
      return true;
    },
    {
      message: "Le nouveau mot de passe doit être différent de l'ancien.",
      path: ["newPassword"],
    },
  );

export const UserAccountProfileInputSchema = z.object({
  name: z.string(),
  email: z.email(),
});

export const UserAccountPasswordInputSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});