import { ApiErrorResponseSchema, errorDetails } from "@/schemas/api.schema";
import { z } from "zod";

export type ApiSuccessResponse<T = unknown> = {
  success: true;
  message: string;
  data: T;
};
export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>;
export type ErrorDetail = z.infer<typeof errorDetails>;
export type ApiResponse<T = unknown> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse;

export class ApiError extends Error {
  public details: ErrorDetail[];
  public status: number;

  constructor(
    message: string,
    details: ErrorDetail[] = [],
    status: number = 400,
  ) {
    super(message);
    this.name = "ApiError";
    this.details = details;
    this.status = status;
  }
}
