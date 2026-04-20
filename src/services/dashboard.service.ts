import { internalApi } from "@/lib/axios-client";
import { handleRequest } from "@/lib/handleApi";
import { TaskApiResponseSchema } from "@/schemas/tasks.schema";

/**
 * Service for handling dashboard-related data fetching on the client side.
 * Interacts with the internal Next.js API routes.
 */
export const dashboardService = {
  /**
   * Retrieves all tasks assigned to the currently authenticated user.
   * 
   * @returns A promise resolving to the list of assigned tasks.
   */
  getAssignedTasks: async () => {
    // Execute GET request to the internal dashboard endpoint
    const response = await handleRequest(
      internalApi.get("/api/dashboard/assigned-tasks"),
      TaskApiResponseSchema
    );

    // Return the validated data payload
    return response.data;
  },
};