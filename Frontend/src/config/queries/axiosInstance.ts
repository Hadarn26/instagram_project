import axios, { AxiosRequestConfig } from "axios";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": [
      import.meta.env.VITE_SERVER_BASE_URL,
      import.meta.env.VITE_AZURE_REDIRECT_URI,
    ].join(","),
    "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
  withCredentials: true,
};

export const axiosInstance = axios.create(axiosConfig);
