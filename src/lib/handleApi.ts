import { z } from "zod";
import { ApiError, ApiResponse, ApiSuccessResponse } from "@/models/api.model";
import { isAxiosError } from "axios";
import { ApiErrorResponseSchema, ApiMinimalSuccessSchema } from "@/schemas/api.schema";

/**
 * Executes an API request and validates the response against a Zod schema.
 * 
 * @param request - A promise containing the Axios response data.
 * @param schema - The Zod schema to validate the successful response.
 * @returns The validated success response.
 */
export async function handleRequest<T>(
  request: Promise<{ data: unknown }>,
  schema: z.ZodType<ApiResponse<T>>,
): Promise<ApiSuccessResponse<T>> {
  try {
    const response = await request;
    // Validate the raw data against the provided Zod schema
    const result = schema.parse(response.data);

    if (!result.success) {
      /* If the backend returns a 200 OK but the body indicates a logical failure,
         we treat it as an unauthorized/invalid request (401). */
      throw new ApiError(result.message, result.details, 401);
    }

    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      // Attempt to parse the error body using our standard API error schema
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
      // Log the structural error for debugging and throw a 422 Unprocessable Entity
      console.log(z.treeifyError(error))
      throw new ApiError("Erreur de validation des données API", [], 422);
    }

    throw error;
  }
}

/**
 * Executes an API request with minimal validation (only checks for success: true).
 * Useful for operations where the specific data structure of the payload is not needed.
 * 
 * @param request - A promise containing the Axios response data.
 * @returns A generic success response.
 */
export async function handleRequestWithoutValidation(request: Promise<{data: unknown}>): Promise<ApiSuccessResponse<unknown>> {
  try {
    const response = await request
    // Only ensures the response follows the basic { success: boolean, message: string } format
    const result = ApiMinimalSuccessSchema.parse(response.data)
  
    return result as ApiSuccessResponse<unknown>
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
      throw new ApiError("Format de réponse invalide", [], 422);
    }

    throw error;
  }
  
}