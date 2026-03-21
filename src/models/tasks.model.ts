import { z } from "zod";
import { TaskApiResponseSchema, TaskSchema, TaskStatusEnum, TaskPriorityEnum } from "@/schemas/tasks.schema";

export type TaskApiResponse = z.infer<typeof TaskApiResponseSchema>;
export type Task = z.infer<typeof TaskSchema>
export type TaskStatus = z.infer<typeof TaskStatusEnum>
export type TaskPriority = z.infer<typeof TaskPriorityEnum>

export const TaskStatusLabels: Record<TaskStatus, string> = {
  TODO: "À faire",
  IN_PROGRESS: "En cours",
  DONE: "Terminée"
}