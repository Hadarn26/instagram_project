import { Box, Typography } from "@mui/material";
import { Header } from "../../shared/components/Header/Header";
import { BottomNav } from "../../shared/components/BottomNav/BottomNav";
import PostCard from "../../shared/components/Posts/PostCard";
import { pageContainerStyles, postsContainerStyles, messageStyles } from "./HomeStyle";
import { useGetPosts } from "../../services/post/hooks/useGetPosts";
import { TPost } from "../../services/post/types/TypePost";
import type { JSX } from "react";

export const Home = (): JSX.Element => {

  const { posts, isLoading, isError } = useGetPosts();

  return (
    <Box
      sx={pageContainerStyles}
    >
      <Header title="instagram" />

      <Box sx={postsContainerStyles} >

        {isLoading && <Typography sx={messageStyles}>Loading...</Typography>}

        {isError && <Typography sx={messageStyles}>Error loading posts</Typography>}

        {!isLoading && posts.length === 0 && (
          <Typography sx={messageStyles}>No posts yet</Typography>
        )}

        {posts.map((post: TPost) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>

      <BottomNav />
    </Box>
  );
}
