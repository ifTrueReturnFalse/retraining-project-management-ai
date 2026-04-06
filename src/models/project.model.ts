import { z } from "zod";
import {
  BasicProjectSchema,
  ProjectSchema,
  ProjectApiResponseSchema,
  CreateProjectInputSchema,
  UpdateProjectInputSchema,
  AllUsersSearchApiResponseSchema,
  ProjectCreateApiResponseSchema,
  ProjectGetAllApiResponseSchema,
  CreateProjectInputFrontSchema,
  UpdateProjectInputFrontSchema
} from "@/schemas/project.schema";

export type BasicProject = z.infer<typeof BasicProjectSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectApiResponse = z.infer<typeof ProjectApiResponseSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectInputSchema>;
export type CreateProjectInputFront = z.infer<
  typeof CreateProjectInputFrontSchema
>;
export type UpdateProjectInputFront = z.infer<
  typeof UpdateProjectInputFrontSchema
>;
export type AllUsersSearchApiResponse = z.infer<
  typeof AllUsersSearchApiResponseSchema
>;
export type ProjectCreateApiResponse = z.infer<
  typeof ProjectCreateApiResponseSchema
>;
export type ProjectGetAllApiResponse = z.infer<
  typeof ProjectGetAllApiResponseSchema
>;
