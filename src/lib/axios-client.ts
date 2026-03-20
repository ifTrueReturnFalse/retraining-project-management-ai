import axios from "axios";

const getBasedUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return "";
};

export const internalApi = axios.create({
  baseURL: getBasedUrl(),
  withCredentials: true,
});
