import { useMutation } from "@tanstack/react-query";
import queryClient from "../../../config/queries/queryClient";
import { toggleLike } from "../like";
import { TToggleLikeParams } from "../types/TypeToggleLikeParams";
import { TPost } from "../../post/types/TypePost";

type TContext = {
    previousPosts?: TPost[];
    previousUserPosts?: TPost[];
};

export const useToggleLikeMutation = () => {
    return useMutation<
        { isLikedByCurrentUser: boolean; likesCount: number },
        Error,
        TToggleLikeParams,
        TContext
    >({
        mutationFn: ({ postId, userId }) =>
            toggleLike(postId, userId),

        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });
            await queryClient.cancelQueries({ queryKey: ["userPosts"] });

            const previousPosts = queryClient.getQueryData<TPost[]>(["posts"]);
            const previousUserPosts = queryClient.getQueryData<TPost[]>(["userPosts"]);

            const update = (posts?: TPost[]) =>
                posts?.map(post =>
                    post.id === postId
                        ? {
                              ...post,
                              isLikedByCurrentUser: !post.isLikedByCurrentUser,
                              likesCount: post.isLikedByCurrentUser
                                  ? post.likesCount - 1
                                  : post.likesCount + 1,
                          }
                        : post
                );

            queryClient.setQueryData(["posts"], update(previousPosts));
            queryClient.setQueryData(["userPosts"], update(previousUserPosts));

            return { previousPosts, previousUserPosts };
        },

        onError: (_err, _vars, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
            if (context?.previousUserPosts) {
                queryClient.setQueryData(["userPosts"], context.previousUserPosts);
            }
        },

        onSuccess: (data, variables) => {
    queryClient.setQueriesData(
        { queryKey: ["posts"] },
        (old: TPost[] | undefined) =>
            old?.map(post =>
                post.id === variables.postId
                    ? {
                          ...post,
                          isLikedByCurrentUser: data.isLikedByCurrentUser,
                          likesCount: data.likesCount,
                      }
                    : post
            )
    );

    queryClient.setQueriesData(
        { queryKey: ["userPosts"] },
        (old: TPost[] | undefined) =>
            old?.map(post =>
                post.id === variables.postId
                    ? {
                          ...post,
                          isLikedByCurrentUser: data.isLikedByCurrentUser,
                          likesCount: data.likesCount,
                      }
                    : post
            )
    );
}
    });
};