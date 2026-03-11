import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getPosts = async (userId: number) => {
  const response = await api.get(`/api/posts/${userId}`);

  return response.data ?? [];
};

export const createPost = async (imageUrl: string, userId: number) => {
  const response = await api.post("/api/posts", {
    imageUrl,
    userId,
  });

  return response.data ?? [];
};

export const getCurrentUser = async (id: number) => {
  const { data } = await api.get(`/api/users/${id}`);
  return data;
};

export const toggleLike = async (postId: number, userId: number) => {
  const res = await api.post(`/api/posts/${postId}/like`, {
    userId,
  });
  return res.data;
};
