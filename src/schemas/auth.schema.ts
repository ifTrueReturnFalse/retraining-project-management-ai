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
