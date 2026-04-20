import { internalApi } from "@/lib/axios-client";
import {
  UserLoginResponseSchema,
  UserProfileResponseSchema,
} from "@/schemas/auth.schema";
import { handleRequest, handleRequestWithoutValidation } from "@/lib/handleApi";
import {
  UserAccountPasswordInput,
  UserAccountProfileInput,
  UserRegisterInput,
} from "@/models/auth.model";

/**
 * Service for handling authentication and user profile operations on the client side.
 * Uses `internalApi` which points to the Next.js API routes.
 */
export const authService = {
  /**
   * Authenticates a user with email and password.
   * @param credentials - The user's login credentials.
   * @returns The login response data including the user object.
   */
  login: async (credentials: { email: string; password: string }) => {
    const response = await handleRequest(
      internalApi.post("/api/auth/login", credentials),
      UserLoginResponseSchema,
    );

    return response.data;
  },

  /**
   * Registers a new user in the system.
   * @param data - The registration details (name, email, password).
   * @returns The API response containing the new user data.
   */
  register: async (data: UserRegisterInput) => {
    const response = await handleRequest(
      internalApi.post("/api/auth/register", data),
      UserLoginResponseSchema,
    );

    return response;
  },

  /**
   * Logs out the current user by clearing the authentication session/cookie.
   */
  logout: async () => {
    await internalApi.post("/api/auth/logout");
  },

  /**
   * Updates the profile information of the currently authenticated user.
   * @param data - The updated profile fields.
   */
  updateProfile: async (data: UserAccountProfileInput) => {
    const response = await handleRequest(
      internalApi.put("/api/auth/profile", data),
      UserProfileResponseSchema,
    );

    return response;
  },

  /**
   * Updates the password for the currently authenticated user.
   * @param data - The current and new password.
   * @returns The API response status.
   */
  updatePassword: async (data: UserAccountPasswordInput) => {
    const response = await handleRequestWithoutValidation(
      internalApi.put("/api/auth/password", data),
    );

    return response;
  },
};
