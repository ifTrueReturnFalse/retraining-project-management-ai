import { internalApi } from "@/lib/axios-client";
import { handleRequest } from "@/lib/handleApi";
import { BasicProject } from "@/models/project.model";
import { ProjectApiResponseSchema } from "@/schemas/project.schema";

export const ProjectService = {
  getProjectWithId: async (projectId: BasicProject["id"]) => {
    const response = await handleRequest(
      internalApi.get(`/api/project/${projectId}`),
      ProjectApiResponseSchema,
    );
    
    return response.data.project
  },
};
