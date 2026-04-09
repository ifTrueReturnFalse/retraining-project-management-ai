import { z } from "zod";
import { BasicProjectSchema } from "./project.schema";
import { AssigneeSchema } from "./assignees.schema";
import { CommentSchema } from "./comments.schema";
import { createApiResponseSchema } from "./api.schema";
import { BasicUserProfileSchema } from "./auth.schema";

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

export const TaskInputFrontSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit faire contenir minimum 3 caractères."),
  description: z.string().min(10, "Merci de fournir des détails sur la tâche."),
  dueDate: z.string(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  assignees: z
    .array(BasicUserProfileSchema)
    .min(1, "Assignez la tâche à une personne minimum."),
});

export const TaskInputSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit faire contenir minimum 3 caractères."),
  description: z.string().min(10, "Merci de fournir des détails sur la tâche."),
  dueDate: z.string(),
  status: TaskStatusEnum,
  priority: TaskPriorityEnum,
  assigneeIds: z
    .array(z.string())
    .min(1, "Assignez la tâche à une personne minimum."),
});

export const TasksProjectApiResponseSchema = createApiResponseSchema(
  z.object({
    tasks: z.array(
      TaskSchema.extend({
        projectId: z.string(),
        creator: BasicUserProfileSchema,
      }),
    ),
  }),
);

export const TaskCommentInputSchema = z.object({
  content: z
    .string()
    .min(1, "Veuillez entrer un commentaire valide.")
    .max(1000, "Ce commentaire est trop long."),
});

export const GeneratedTaskSchema = TaskSchema.pick({
  title: true,
  description: true,
  dueDate: true,
  status: true,
  priority: true,
});

export const GeneratedTasksResponseSchema = z.object({
  tasks: z.array(GeneratedTaskSchema),
});

