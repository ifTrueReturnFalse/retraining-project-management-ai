import { z } from "zod";
import { BasicUserProfileSchema } from "./auth.schema";

export const CommentSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  taskId: z.string(),
  authorId: z.string(),
  author: BasicUserProfileSchema,
});
