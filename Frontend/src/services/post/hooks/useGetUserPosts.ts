import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../post";
import { userAtom } from "../../../store/userAtom";
import { useAtomValue } from "jotai";
import type { TPost } from "../types/TypePost";

type TUseGetUserPostsResult = {
  userPosts: TPost[];
  isLoading: boolean;
  isError: boolean;
};

export const useGetUserPosts = (): TUseGetUserPostsResult => {
  const user = useAtomValue(userAtom);

  const query = useQuery({
    queryKey: ["userPosts", user?.id],
    queryFn: () => getUserPosts(user!.id),
    enabled: user.id !== null,
  });

  return {
    userPosts: (query.data ?? []) as TPost[],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};