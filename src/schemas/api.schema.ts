import { z } from "zod";

export const errorDetails = z.object({
  field: z.string(),
  message: z.string(),
});

export const ApiSuccessResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    message: z.string(),
    data: dataSchema,
  });

export const ApiErrorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  error: z.string(),
  details: z.array(errorDetails).optional().default([]),
});

export const createApiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.discriminatedUnion("success", [
    ApiSuccessResponseSchema(dataSchema),
    ApiErrorResponseSchema,
  ]);
