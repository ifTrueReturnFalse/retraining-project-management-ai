import axios from "axios";
import { cookies } from "next/headers";

export const externalApi = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_jwt");

  return axios.create({
    baseURL: process.env.EXTERNAL_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token.value}` : "",
    },
  });
};

