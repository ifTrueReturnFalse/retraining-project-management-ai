import { z } from "zod";
import { BasicProjectSchema } from "./project.schema";
import { AssigneeSchema } from "./assignees.schema";
import { CommentSchema } from "./comments.schema";
import { createApiResponseSchema } from "./api.schema";

export const TaskStatusEnum = z.enum(["TODO", "IN_PROGRESS", "DONE"]);

export const TaskPriorityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  dueDate: z.iso.datetime(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  creatorId: z.string(),
  project: BasicProjectSchema,
  assignees: z.array(AssigneeSchema),
  comments: z.array(CommentSchema),
});

export const TaskApiResponseSchema = createApiResponseSchema(
  z.object({
    tasks: z.array(TaskSchema),
  }),
);

export const TaskInputSchema = TaskSchema.pick({
  title: true,
  description: true,
  dueDate: true,
  assignees: true,
  status: true,
});
