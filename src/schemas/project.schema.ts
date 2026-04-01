import { z } from "zod";
import { BasicUserProfileSchema } from "./auth.schema";
import { createApiResponseSchema } from "./api.schema";

export const BasicProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const ProjectMemberSchema = z.object({
  id: z.string(),
  role: z.string(),
  projectId: z.string(),
  user: BasicUserProfileSchema,
  userId: z.string(),
  joinedAt: z.iso.datetime(),
});

export const ProjectSchema = z.object({
  ...BasicProjectSchema.shape,
  owner: BasicUserProfileSchema,
  ownerId: z.string(),
  members: z.array(ProjectMemberSchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  userRole: z.string(),
});

export const AllUsersSearchSchema = z.object({
  users: z.array(BasicUserProfileSchema),
});

export const CreateProjectInputSchema = z.object({
  name: z.string().min(3, "Un titre d'au moins 3 lettres est nécessaire."),
  description: z.string().min(10, "Une description détaillée est nécessaire."),
  contributors: z.array(BasicUserProfileSchema.shape.id),
});

export const ProjectApiResponseSchema = createApiResponseSchema(
  z.object({ project: ProjectSchema }),
);

export const AllUsersSearchApiResponseSchema =
  createApiResponseSchema(AllUsersSearchSchema);

export const ProjectCreateApiResponseSchema = createApiResponseSchema(
  z.object({ projectId: z.string() }),
);

export const ProjectGetAllApiResponseSchema = createApiResponseSchema(
  z.object({ projects: z.array(ProjectSchema) }),
);
