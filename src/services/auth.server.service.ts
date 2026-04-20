import { externalApi } from "@/lib/axios-server";
import { handleRequest } from "@/lib/handleApi";
import { UserProfileResponseSchema } from "@/schemas/auth.schema";

/**
 * Service for handling authentication operations on the server side (Server Components/Actions).
 * Uses `externalApi` which includes the necessary cookies/headers to communicate with the backend.
 */
export const authServerService = {
  /**
   * Retrieves the profile of the currently authenticated user from the backend.
   * 
   * @returns The user object if authenticated and valid, otherwise null.
   */
  profile: async () => {
    try {
      // Initialize the API instance with server-side context (cookies)
      const api = await externalApi();
      
      // Execute the GET request and validate the response against the schema
      const response = await handleRequest(
        api.get("/auth/profile"),
        UserProfileResponseSchema,
      );
  
      // If validation fails or API returns an error, return null to signify unauthenticated state
      if (!response.success) {
        return null;
      }
      return response.data.user;
    } catch {
      return null
    }
    
  },
};
