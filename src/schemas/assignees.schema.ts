import { z } from "zod";
import { BasicUserProfileSchema } from "./auth.schema";

export const AssigneeSchema = z.object({
  id: z.string(),
  assignedAt: z.iso.datetime(),
  taskId: z.string(),
  userId: z.string(),
  user: BasicUserProfileSchema,
});
