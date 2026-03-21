import {
  UserProfileSchema,
  UserLoginSchema,
  UserProfileResponseSchema,
  UserLoginResponseSchema,
  BasicUserProfileSchema
} from "@/schemas/auth.schema";
import { z } from "zod";

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
export type BasicUserProfile = z.infer<typeof BasicUserProfileSchema>