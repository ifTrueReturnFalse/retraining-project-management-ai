import { internalApi } from "@/lib/axios-client";
import { handleRequest, handleRequestWithoutValidation } from "@/lib/handleApi";
import { Task, TaskInput } from "@/models/tasks.model";
import { Project } from "@/models/project.model";
import { TasksProjectApiResponseSchema } from "@/schemas/tasks.schema";

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

  getTasksProject: async (projectId: Project["id"]) => {
    const response = await handleRequest(
      internalApi.get(`/api/project/${projectId}/tasks`),
      TasksProjectApiResponseSchema,
    );

    return response.data.tasks
  },
};
