import { z } from "zod";

export const BasicProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});
