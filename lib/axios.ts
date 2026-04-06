import axios from "axios";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_API_BASE_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});
