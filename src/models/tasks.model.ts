import { z } from "zod";
import { TaskApiResponseSchema, TaskSchema } from "@/schemas/tasks.schema";

export type TaskApiResponse = z.infer<typeof TaskApiResponseSchema>;
export type Task = z.infer<typeof TaskSchema>