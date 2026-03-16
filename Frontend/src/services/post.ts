import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import queryClient from "../config/queries/queryClient";

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

export const toggleLike = async (postId: number, userId: number) => {
    const res = await api.post(`/api/posts/${postId}/like`, {
        userId,
    });
    return res.data;
};

type ToggleLikeParams = {
    postId: number;
    userId: number;
};

type Post = {
    id: number;
    imageUrl: string;
    description: string;
    user?: {
        id?: number;
        username?: string;
        profileImg?: string;
    };
    likesCount: number;
    likedByCurrentUser: boolean;
};

export const useToggleLikeMutation = () => {

    return useMutation({
        mutationFn: ({ postId, userId }: ToggleLikeParams) =>
            toggleLike(postId, userId),

        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

            queryClient.setQueryData<Post[]>(["posts"], (oldPosts = []) =>
                oldPosts.map((post) =>
                    post.id === postId
                        ? {
                              ...post,
                              likedByCurrentUser: !post.likedByCurrentUser,
                              likesCount: post.likedByCurrentUser
                                  ? post.likesCount - 1
                                  : post.likesCount + 1,
                          }
                        : post
                )
            );

            return { previousPosts };
        },

        onError: (_error, _variables, context) => {
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    });
};