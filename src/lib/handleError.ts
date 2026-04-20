/**
 * Type guard to check if an unknown error object contains a numeric status code.
 * This is useful for identifying custom ApiError instances or Axios-like error structures
 * across the application.
 * 
 * @param error - The error object to inspect.
 * @returns True if the error is an object containing a 'status' property of type number.
 */
export function hasStatus(
  error: unknown,
): error is { status: number; message?: string } {
  // Check if error is a non-null object and contains the 'status' key
  // This allows safe access to error.status in subsequent logic
  return typeof error === "object" && error !== null && "status" in error;
}
