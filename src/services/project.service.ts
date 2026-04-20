import { internalApi } from "@/lib/axios-client";
import { handleRequest, handleRequestWithoutValidation } from "@/lib/handleApi";
import {
  BasicProject,
  CreateProjectInput,
  UpdateProjectInput,
  Project,
} from "@/models/project.model";
import {
  ProjectApiResponseSchema,
  AllUsersSearchApiResponseSchema,
  ProjectCreateApiResponseSchema,
  ProjectGetAllApiResponseSchema,
} from "@/schemas/project.schema";

/**
 * Service for managing project-related operations on the client side.
 * Interacts with internal Next.js API routes.
 */
export const ProjectService = {
  /**
   * Retrieves detailed information for a specific project by its ID.
   * @param projectId - The unique identifier of the project.
   * @returns The project details.
   */
  getProjectWithId: async (projectId: BasicProject["id"]) => {
    const response = await handleRequest(
      internalApi.get(`/api/project/${projectId}`),
      ProjectApiResponseSchema,
    );

    return response.data.project;
  },

  /**
   * Fetches a list of all users available in the system (e.g., for project assignment).
   * @returns A list of user objects.
   */
  getAllUsers: async () => {
    const response = await handleRequest(
      internalApi.get("/api/users"),
      AllUsersSearchApiResponseSchema,
    );

    return response.data.users;
  },

  /**
   * Creates a new project.
   * @param data - The project creation details (name, description, members).
   * @returns The API response containing the created project data.
   */
  createProject: async (data: CreateProjectInput) => {
    const response = await handleRequest(
      internalApi.post("/api/project", data),
      ProjectCreateApiResponseSchema,
    );

    return response;
  },

  /**
   * Retrieves all projects associated with the current user.
   * @returns A list of projects.
   */
  getAllProjects: async () => {
    const response = await handleRequest(
      internalApi.get("/api/project"),
      ProjectGetAllApiResponseSchema,
    );

    return response.data.projects;
  },

  /**
   * Updates an existing project's information.
   * @param projectId - The ID of the project to update.
   * @param data - The updated project fields.
   * @returns The API response status.
   */
  updateProject: async (projectId: Project["id"], data: UpdateProjectInput) => {
    const response = await handleRequestWithoutValidation(
      internalApi.put(`/api/project/${projectId}`, data),
    );

    return response;
  },

  /**
   * Deletes a project from the system.
   * @param projectId - The ID of the project to remove.
   * @returns The API response status.
   */
  deleteProject: async (projectId: Project["id"]) => {
    const response = await handleRequestWithoutValidation(
      internalApi.delete(`/api/project/${projectId}`),
    );

    return response;
  },
};
