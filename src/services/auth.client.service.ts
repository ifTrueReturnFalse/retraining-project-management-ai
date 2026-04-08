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

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await handleRequest(
      internalApi.post("/api/auth/login", credentials),
      UserLoginResponseSchema,
    );

    return response.data;
  },

  register: async (data: UserRegisterInput) => {
    const response = await handleRequest(
      internalApi.post("/api/auth/register", data),
      UserLoginResponseSchema,
    );

    return response;
  },

  logout: async () => {
    await internalApi.post("/api/auth/logout");
  },

  updateProfile: async (data: UserAccountProfileInput) => {
    const response = await handleRequest(
      internalApi.put("/api/auth/profile", data),
      UserProfileResponseSchema,
    );

    return response;
  },

  updatePassword: async (data: UserAccountPasswordInput) => {
    const response = await handleRequestWithoutValidation(
      internalApi.put("/api/auth/password", data),
    );

    return response;
  },
};
