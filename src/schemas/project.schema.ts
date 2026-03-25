import { z } from "zod";
import { UserProfileSchema } from "./auth.schema";
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
  user: UserProfileSchema.omit({
    createdAt: true,
    updatedAt: true,
  }),
  userId: z.string(),
  joinedAt: z.iso.datetime(),
});

export const ProjectSchema = z.object({
  ...BasicProjectSchema.shape,
  owner: UserProfileSchema.omit({
    createdAt: true,
    updatedAt: true,
  }),
  ownerId: z.string(),
  members: z.array(ProjectMemberSchema),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  userRole: z.string(),
});

export const ProjectApiResponseSchema = createApiResponseSchema(
  z.object({ project: ProjectSchema }),
);
