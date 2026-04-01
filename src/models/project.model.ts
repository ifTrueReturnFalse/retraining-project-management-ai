import { z } from "zod";
import {
  BasicProjectSchema,
  ProjectSchema,
  ProjectApiResponseSchema,
  CreateProjectInputSchema,
  AllUsersSearchApiResponseSchema,
  ProjectCreateApiResponseSchema,
  ProjectGetAllApiResponseSchema,
} from "@/schemas/project.schema";

export type BasicProject = z.infer<typeof BasicProjectSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectApiResponse = z.infer<typeof ProjectApiResponseSchema>;
export type CreateProjectInput = z.infer<typeof CreateProjectInputSchema>;
export type AllUsersSearchApiResponse = z.infer<
  typeof AllUsersSearchApiResponseSchema
>;
export type ProjectCreateApiResponse = z.infer<
  typeof ProjectCreateApiResponseSchema
>;
export type ProjectGetAllApiResponse = z.infer<
  typeof ProjectGetAllApiResponseSchema
>;
