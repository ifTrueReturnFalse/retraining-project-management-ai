import { z } from "zod";
import { BasicProjectSchema, ProjectSchema, ProjectApiResponseSchema } from "@/schemas/project.schema";

export type BasicProject = z.infer<typeof BasicProjectSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectApiResponse = z.infer<typeof ProjectApiResponseSchema>