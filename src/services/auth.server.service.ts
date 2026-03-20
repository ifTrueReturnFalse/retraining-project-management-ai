import { externalApi } from "@/lib/axios-server";
import { handleRequest } from "@/lib/handleApi";
import { UserProfileResponseSchema } from "@/schemas/auth.schema";

export const authServerService = {
  profile: async () => {
    try {
      
      const api = await externalApi();
      const response = await handleRequest(
        api.get("/auth/profile"),
        UserProfileResponseSchema,
      );
  
      if (!response.success) {
        return null;
      }
      return response.data.user;
    } catch {
      return null
    }
    
  },
};
