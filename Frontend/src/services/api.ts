import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getPosts = async () => {
  const response = await api.get("/api/posts");

  return response.data ?? [];
};

export const createPost = async (imageUrl: string) => {
  const response = await api.post("/api/posts", {
    imageUrl,
  });

  return response.data ?? [];
};
