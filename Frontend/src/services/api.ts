import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getPosts = async () => {
  console.log("calling api");

  const response = await api.get("/api/posts");

  console.log(response.data);

  return response.data ?? [];
};