import type { TPost } from "../../../services/post/types/TypePost";
import type { TToggleLikeParams } from "../../../services/post/types/TypeToggleLikeParams";
import type { TUser } from "../../../services/user/types/TypeUser";

type THandleLikeParams = {
  userId: TUser['id'] | null;
  postId: TPost['id'];
  mutate: (params: TToggleLikeParams) => void;
};

export const handleLikePost = ({
  userId,
  postId,
  mutate,
}: THandleLikeParams): void => {
  if (!userId) return;

  mutate({ postId, userId });
};