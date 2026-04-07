import {
  UserProfileSchema,
  UserLoginSchema,
  UserProfileResponseSchema,
  UserLoginResponseSchema,
  BasicUserProfileSchema,
  UserAccountInputFrontSchema,
  UserAccountProfileInputSchema,
  UserAccountPasswordInputSchema,
} from "@/schemas/auth.schema";
import { z } from "zod";

export type UserProfile = z.infer<typeof UserProfileSchema>;
export type UserLogin = z.infer<typeof UserLoginSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type UserLoginResponse = z.infer<typeof UserLoginResponseSchema>;
export type BasicUserProfile = z.infer<typeof BasicUserProfileSchema>;
export type UserAccountInputFront = z.infer<typeof UserAccountInputFrontSchema>;
export type UserAccountProfileInput = z.infer<
  typeof UserAccountProfileInputSchema
>;
export type UserAccountPasswordInput = z.infer<
  typeof UserAccountPasswordInputSchema
>;
