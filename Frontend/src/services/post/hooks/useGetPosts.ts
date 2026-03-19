import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../post";
import { userAtom } from "../../../store/userAtom";
import { useAtomValue } from "jotai";
import type { TPost } from "../types/TypePost";

type TUseGetPostsResult = {
  posts: TPost[];
  isLoading: boolean;
  isError: boolean;
};

export const useGetPosts = (): TUseGetPostsResult => {

  const user = useAtomValue(userAtom);

  const query = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => getPosts(user!.id),
    enabled: user.id !== null,
  });

  return {
    posts: (query.data ?? []) as TPost[],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};