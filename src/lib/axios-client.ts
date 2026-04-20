import axios from "axios";

/**
 * Determines the base URL for API requests based on the execution environment.
 * 
 * @returns {string} The absolute URL for server-side calls or an empty string for client-side 
 * relative calls (leveraging the browser's current origin).
 */
const getBasedUrl = () => {
  // Check if we are running on the server (Node.js) or in the browser
  if (typeof window === "undefined") {
    // On server-side, we need the full URL to reach the internal API
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // On client-side, an empty string allows relative paths (e.g., /api/...)
  return "";
};

/**
 * Axios instance configured for internal API communication.
 * 
 * This instance handles requests to the Next.js API routes.
 * It includes `withCredentials: true` to ensure that session cookies 
 * are automatically sent with every request.
 */
export const internalApi = axios.create({
  baseURL: getBasedUrl(),
  // Required to pass cookies/authentication headers between the client and the Next.js server
  withCredentials: true,
});
