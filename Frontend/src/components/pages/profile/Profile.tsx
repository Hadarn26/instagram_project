import { Box, Avatar, Typography } from "@mui/material";
import Header from "../../Header/Header";
import PostCard from "../../Posts/PostCard";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/api";
import BottomNav from "../../BottomNav/BottomNav";
import { useCurrentUser } from "../../../hooks/core/useCurrentUser";
import PersonIcon from "@mui/icons-material/Person";

function Profile() {

 const { data: user } = useCurrentUser();

  const { data: posts } = useQuery({
    queryKey: ["posts", user?.id],
    queryFn: () => getPosts(user?.id),
    enabled: !!user,
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
    <Header title={user?.username || "profile"} />

    {/* scroll container */}
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
      }}
    >
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
          sx={{
            width: 90,
            height: 90,
            border: "2px solid #eee",
          }}
        >
          {!user?.profileImg && <PersonIcon fontSize="large" />}
        </Avatar>

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
      {userPosts?.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>

    <BottomNav />
  </Box>
);
}

export { Profile as Component };