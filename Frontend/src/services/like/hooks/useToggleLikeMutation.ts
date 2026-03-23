import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../config/queries/queryClient";
import { toggleLike } from "../like";
import { TToggleLikeParams } from "../types/TypeToggleLikeParams";
import { TPost } from "../../post/types/TypePost";

type TContext = {
  previousPosts?: TPost[];
  previousUserPosts?: TPost[];
};

type TServerResponse = {
  isLikedByCurrentUser: boolean;
  likesCount: number;
};

const cancelLikeQueries = async () => {
  await queryClient.cancelQueries({ queryKey: ["posts"] });
  await queryClient.cancelQueries({ queryKey: ["userPosts"] });
};

const getPreviousPostsData = (): TContext => ({
  previousPosts: queryClient.getQueryData<TPost[]>(["posts"]),
  previousUserPosts: queryClient.getQueryData<TPost[]>(["userPosts"]),
});

const optimisticLikeUpdate = (
  posts: TPost[] | undefined,
  postId: TPost["id"],
) =>
  posts?.map((post) =>
    post.id === postId
      ? {
          ...post,
          isLikedByCurrentUser: !post.isLikedByCurrentUser,
          likesCount: post.isLikedByCurrentUser
            ? post.likesCount - 1
            : post.likesCount + 1,
        }
      : post,
  );

const applyOptimisticLike = (postId: TPost["id"]): TContext => {
  const { previousPosts, previousUserPosts } = getPreviousPostsData();

  queryClient.setQueryData(
    ["posts"],
    optimisticLikeUpdate(previousPosts, postId),
  );

  queryClient.setQueryData(
    ["userPosts"],
    optimisticLikeUpdate(previousUserPosts, postId),
  );

  return { previousPosts, previousUserPosts };
};

const rollbackLike = (context?: TContext) => {
  if (context?.previousPosts) {
    queryClient.setQueryData(["posts"], context.previousPosts);
  }
  if (context?.previousUserPosts) {
    queryClient.setQueryData(["userPosts"], context.previousUserPosts);
  }
};

const syncLikeFromServer = (postId: TPost["id"], data: TServerResponse) => {
  const update = (posts?: TPost[]) =>
    posts?.map((post) =>
      post.id === postId
        ? {
            ...post,
            isLikedByCurrentUser: data.isLikedByCurrentUser,
            likesCount: data.likesCount,
          }
        : post,
    );

  queryClient.setQueriesData({ queryKey: ["posts"] }, update);
  queryClient.setQueriesData({ queryKey: ["userPosts"] }, update);
};

export const useToggleLikeMutation = () => {
  return useMutation<TServerResponse, Error, TToggleLikeParams, TContext>({
    mutationFn: ({ postId, userId }) => toggleLike(postId, userId),

    onMutate: async ({ postId }) => {
      await cancelLikeQueries();
      return applyOptimisticLike(postId);
    },

    onError: (_err, _vars, context) => {
      rollbackLike(context);
    },

    onSuccess: (data, variables) => {
      syncLikeFromServer(variables.postId, data);
    },
  });
};
