import type { TPost } from "../../../services/post/types/TypePost";
import type { TToggleLikeParams } from "../../../services/post/types/TypeToggleLikeParams";
import type { TUser } from "../../../services/user/types/TypeUser";

type THandleLikeParams = {
  userId: TUser["id"] | null;
  postId: TPost["id"];
  isPending: boolean;
  mutate: (params: TToggleLikeParams) => void;
};

export const handleLikePost = ({
  userId,
  postId,
  isPending,
  mutate,
}: THandleLikeParams): void => {
  if (!userId) return;
  if (isPending) return;

  mutate({ postId, userId });
};
