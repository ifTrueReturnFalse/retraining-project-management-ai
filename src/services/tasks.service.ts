import { internalApi } from "@/lib/axios-client";
import { handleRequest, handleRequestWithoutValidation } from "@/lib/handleApi";
import { GeneratedTasksResponse, GenerateTasksInput, Task, TaskInput } from "@/models/tasks.model";
import { Project } from "@/models/project.model";
import {
  GeneratedTasksResponseSchema,
  TasksProjectApiResponseSchema,
} from "@/schemas/tasks.schema";
import { z } from "zod";

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

    return response.data.tasks;
  },

  postComment: async (
    projectId: Project["id"],
    taskId: Task["id"],
    data: string,
  ) => {
    const response = await handleRequestWithoutValidation(
      internalApi.post(`/api/project/${projectId}/tasks/${taskId}/comments`, {
        content: data,
      }),
    );

    return response;
  },

  postTask: async (projectId: Project["id"], data: TaskInput) => {
    const response = await handleRequestWithoutValidation(
      internalApi.post(`/api/project/${projectId}/tasks`, data),
    );

    return response;
  },

  generateTasks: async (data: GenerateTasksInput): Promise<GeneratedTasksResponse> => {
    const response = await internalApi.post(
      `/api/project/${data.project.id}/tasks/generate`,
      data,
    );

    const safedParsed = z.safeParse(
      GeneratedTasksResponseSchema,
      response.data,
    );

    if (safedParsed.success) {
      return response.data;
    } else {
      throw new Error("Le format reçu ne correspond pas");
    }
  },
};
