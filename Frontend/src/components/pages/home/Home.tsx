import { Box, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/api";
import Header from "../../Header/Header";
import BottomNav from "../../BottomNav/BottomNav";
import PostCard from "../../Posts/PostCard";

function Home() {
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: "auto",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Header title="instagram" />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {isLoading && <Typography sx={{ p: 2 }}>Loading...</Typography>}

        {isError && <Typography sx={{ p: 2 }}>Error loading posts</Typography>}

        {!isLoading && posts.length === 0 && (
          <Typography sx={{ p: 2 }}>No posts yet</Typography>
        )}

        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>

      <BottomNav />
    </Box>
  );
}

export { Home as Component };