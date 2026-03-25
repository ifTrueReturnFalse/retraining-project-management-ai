import { AssigneeSchema } from "@/schemas/assignees.schema";
import { z } from "zod";

export type Assignee = z.infer<typeof AssigneeSchema>;
