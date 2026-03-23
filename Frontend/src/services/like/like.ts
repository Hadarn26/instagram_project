import axios from "axios";
import type { TPost } from "../post/types/TypePost";
import type { TUser } from "../user/types/TypeUser";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});

export const toggleLike = async (
  postId: TPost["id"],
  userId: TUser["id"],
): Promise<{ isLikedByCurrentUser: boolean; likesCount: number }> => {
  const response = await api.post(`/api/likes/${postId}`, { userId });
  return response.data;
};
