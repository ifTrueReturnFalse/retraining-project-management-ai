import { z } from "zod";
import {
  TaskApiResponseSchema,
  TaskSchema,
  TaskStatusEnum,
  TaskPriorityEnum,
  TaskInputSchema,
  TasksProjectApiResponseSchema,
  TaskCommentInputSchema,
  TaskInputFrontSchema
} from "@/schemas/tasks.schema";

export type TaskApiResponse = z.infer<typeof TaskApiResponseSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type TaskStatus = z.infer<typeof TaskStatusEnum>;
export type TaskPriority = z.infer<typeof TaskPriorityEnum>;
export type TaskInput = z.infer<typeof TaskInputSchema>;
export type TaskInputFront = z.infer<typeof TaskInputFrontSchema>

export const TaskStatusLabels: Record<TaskStatus, string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminée",
};

export const TaskPriorityLabels: Record<
  TaskPriority,
  { label: string; weight: number }
> = {
  LOW: { label: "Basse", weight: 0 },
  MEDIUM: { label: "Moyenne", weight: 1 },
  HIGH: { label: "Haute", weight: 2 },
};

export type TaskProjectApiResponse = z.infer<typeof TasksProjectApiResponseSchema>
export type TaskCommentInput = z.infer<typeof TaskCommentInputSchema>

export interface GeneratedTasksResponse {
  tasks: {
    title: string;
    description: string;
    dueDate: string;
    status: "TODO" | "IN_PROGRESS" | "DONE";
    priority: "LOW" | "MEDIUM" | "HIGH";
  }[];
}