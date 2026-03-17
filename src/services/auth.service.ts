import { internalApi } from "@/lib/axios-client";
import {
  UserProfileResponseSchema,
  UserLoginResponseSchema,
} from "@/schemas/auth.schema";
import { handleRequest } from "@/lib/handleApi";

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await handleRequest(
      internalApi.post("/api/auth/login", credentials),
      UserLoginResponseSchema,
    );
   
    return response.data;
  },

  logout: async () => {
    await internalApi.post("/api/auth/logout");
  },

  profile: async () => {
    const response = await handleRequest(
      internalApi.get("/api/auth/profile"),
      UserProfileResponseSchema,
    );

    if (!response.success) {
      return null;
    }

    return response.data;
  },
};
