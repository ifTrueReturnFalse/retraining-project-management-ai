import { z } from "zod";
import { createApiResponseSchema } from "./api.schema";

export const UserProfileSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const UserLoginSchema = z.object({
  user: UserProfileSchema,
  token: z.string(),
});

export const UserProfileResponseSchema =
  createApiResponseSchema(UserProfileSchema);

export const UserLoginResponseSchema = createApiResponseSchema(UserLoginSchema);
