import axios from "axios";
import { cookies } from "next/headers";

/**
 * Creates an Axios instance for server-side communication with the external backend API.
 * 
 * This function must be called within a Server Component or Server Action because it 
 * accesses Next.js `cookies()`. It automatically retrieves the JWT from the user's 
 * browser cookies and attaches it as a Bearer token.
 * 
 * @returns A configured Axios instance.
 */
export const externalApi = async () => {
  // Access the request cookies to retrieve the authentication token
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_jwt");

  return axios.create({
    baseURL: process.env.EXTERNAL_API_URL,
    headers: {
      // Inject the JWT into the Authorization header if it exists
      Authorization: token ? `Bearer ${token.value}` : "",
    },
    withCredentials: true,
  });
};
