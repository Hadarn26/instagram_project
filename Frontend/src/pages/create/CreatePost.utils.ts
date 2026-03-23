import { createPost } from "../../services/post/post";
import { ROUTES } from "../../config/router/routes";
import { NavigateFunction } from "react-router-dom";
import type { TUser } from "../../services/user/types/TypeUser";

export const handleCreatePost = async (
  imageUrl: string,
  userId: TUser["id"] | null,
  navigate: NavigateFunction,
): Promise<void> => {
  if (!userId) return;

  try {
    await createPost(imageUrl, userId);
    navigate(ROUTES.HOME);
  } catch (error) {
    console.error(error);
  }
};
