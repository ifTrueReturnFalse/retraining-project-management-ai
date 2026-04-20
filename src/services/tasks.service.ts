import { internalApi } from "@/lib/axios-client";
import { handleRequest, handleRequestWithoutValidation } from "@/lib/handleApi";
import {
  GeneratedTasksResponse,
  GenerateTasksInput,
  Task,
  TaskInput,
} from "@/models/tasks.model";
import { Project } from "@/models/project.model";
import {
  GeneratedTasksResponseSchema,
  TasksProjectApiResponseSchema,
} from "@/schemas/tasks.schema";
import { z } from "zod";

/**
 * Service for managing task-related operations on the client side.
 * Interacts with internal Next.js API routes for task CRUD, comments, and AI generation.
 */
export const TaskService = {
  /**
   * Updates an existing task within a specific project.
   * @param projectId - The ID of the project the task belongs to.
   * @param taskId - The unique identifier of the task.
   * @param data - The updated task fields (title, description, status, etc.).
   * @returns The API response status.
   */
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

  /**
   * Retrieves all tasks associated with a specific project.
   * @param projectId - The ID of the project.
   * @returns A list of tasks.
   */
  getTasksProject: async (projectId: Project["id"]) => {
    const response = await handleRequest(
      internalApi.get(`/api/project/${projectId}/tasks`),
      TasksProjectApiResponseSchema,
    );

    return response.data.tasks;
  },

  /**
   * Adds a comment to a specific task.
   * @param projectId - The ID of the project.
   * @param taskId - The ID of the task.
   * @param data - The text content of the comment.
   * @returns The API response status.
   */
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

  /**
   * Creates a new task within a project.
   * @param projectId - The ID of the project.
   * @param data - The task details.
   * @returns The API response status.
   */
  postTask: async (projectId: Project["id"], data: TaskInput) => {
    const response = await handleRequestWithoutValidation(
      internalApi.post(`/api/project/${projectId}/tasks`, data),
    );

    return response;
  },

  /**
   * Generates a list of suggested tasks using AI based on project context.
   * @param data - The generation input including project details and prompt.
   * @returns A promise resolving to the generated tasks.
   */
  generateTasks: async (
    data: GenerateTasksInput,
  ): Promise<GeneratedTasksResponse> => {
    // Perform the POST request to the AI generation endpoint
    const response = await internalApi.post(
      `/api/project/${data.project.id}/tasks/generate`,
      data,
    );

    /* 
       Manual validation using Zod to ensure the AI-generated 
       content matches our internal Task structure.
    */
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

  /**
   * Deletes a task from a project.
   * @param projectId - The ID of the project.
   * @param taskId - The ID of the task to remove.
   * @returns The API response status.
   */
  deleteTask: async (projectId: Project["id"], taskId: Task["id"]) => {
    const response = await handleRequestWithoutValidation(
      internalApi.delete(`/api/project/${projectId}/tasks/${taskId}`),
    );

    return response;
  },
};
