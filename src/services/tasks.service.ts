import { internalApi } from "@/lib/axios-client";
import { handleRequestWithoutValidation } from "@/lib/handleApi";
import { Task, TaskInput } from "@/models/tasks.model";

export const TaskService = {
  updateTask: async (
    projectId: Task["project"]["id"],
    taskId: Task["id"],
    data: TaskInput,
  ) => {
    const response = await handleRequestWithoutValidation(
      internalApi.put(`/api/project/${projectId}/tasks/${taskId}`, data),
    );

    return response;
  },
};
