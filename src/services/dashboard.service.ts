import { internalApi } from "@/lib/axios-client";
import { handleRequest } from "@/lib/handleApi";
import { TaskApiResponseSchema } from "@/schemas/tasks.schema";

export const dashboardService = {
  getAssignedTasks: async () => {
    const response = await handleRequest(
      internalApi.get("/api/dashboard/assigned-tasks"),
      TaskApiResponseSchema
    )

    return response.data
  }
}