import { Box, Avatar, Typography } from "@mui/material";
import Header from "../../Header/Header";
import PostCard from "../../Posts/PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts, getCurrentUser } from "../../../services/api";
import BottomNav from "../../BottomNav/BottomNav";

function Profile() {

  const { data: user } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  console.log(user);

  const userPosts = posts?.filter((post: any) => post.user?.id === user?.id);

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
      {/* header */}
      <Header title={user?.username || "profile"} />

      {/* profile info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        <Avatar
          src={user?.profileImg}
          sx={{ width: 80, height: 80 }}
        />

        <Typography
          sx={{
            mt: 1,
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          {user?.username}
        </Typography>
      </Box>

      {/* posts */}
      <Box>
        {userPosts?.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Box>

      <BottomNav />

    </Box>
  );
}

export { Profile as Component };