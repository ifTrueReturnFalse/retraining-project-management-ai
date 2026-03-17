import { z } from "zod";
import { ApiError, ApiResponse, ApiSuccessResponse } from "@/models/api.model";
import { isAxiosError } from "axios";
import { ApiErrorResponseSchema } from "@/schemas/api.schema";

export async function handleRequest<T>(
  request: Promise<{ data: unknown }>,
  schema: z.ZodType<ApiResponse<T>>,
): Promise<ApiSuccessResponse<T>> {
  try {
    const response = await request;
    const result = schema.parse(response.data);

    if (!result.success) {
      throw new ApiError(result.message, result.details, 401);
    }

    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      const parsedError = ApiErrorResponseSchema.safeParse(
        error.response?.data,
      );

      if (parsedError.success) {
        throw new ApiError(
          parsedError.data.message,
          parsedError.data.details,
          error.response?.status,
        );
      }
    }
    if (error instanceof z.ZodError) {
      throw new ApiError("Erreur de validation des données API", [], 422);
    }

    throw error;
  }
}
