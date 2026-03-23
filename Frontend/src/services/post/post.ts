import axios from "axios";
import { TPost } from "./types/TypePost";
import { TToggleLikeParams } from "./types/TypeToggleLikeParams";
import { TUser } from "../user/types/TypeUser";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const getPosts = async (userId: TUser["id"]): Promise<TPost[]> => {
  const response = await api.get(`/api/posts/${userId}`);
  return (response.data ?? []) as TPost[];
};

export const getUserPosts = async (userId: TUser["id"]): Promise<TPost[]> => {
  const response = await api.get(`/api/posts/user/${userId}`);
  return (response.data ?? []) as TPost[];
};

export const createPost = async (
  imageUrl: string,
  userId: TUser["id"],
): Promise<TPost> => {
  const response = await api.post("/api/posts", {
    imageUrl,
    userId,
  });
  return response.data as TPost;
};
