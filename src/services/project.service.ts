import { internalApi } from "@/lib/axios-client";
import { handleRequest } from "@/lib/handleApi";
import { BasicProject, CreateProjectInput } from "@/models/project.model";
import {
  ProjectApiResponseSchema,
  AllUsersSearchApiResponseSchema,
  ProjectCreateApiResponseSchema,
} from "@/schemas/project.schema";

export const ProjectService = {
  getProjectWithId: async (projectId: BasicProject["id"]) => {
    const response = await handleRequest(
      internalApi.get(`/api/project/${projectId}`),
      ProjectApiResponseSchema,
    );

    return response.data.project;
  },

  getAllUsers: async () => {
    const response = await handleRequest(
      internalApi.get("/api/users"),
      AllUsersSearchApiResponseSchema,
    );

    return response.data.users;
  },

  createProject: async (data: CreateProjectInput) => {
    const response = await handleRequest(
      internalApi.post("/api/project", data),
      ProjectCreateApiResponseSchema
    );
    
    return response;
  },
};
