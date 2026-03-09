import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../../services/api";

function Home() {

  const { data: posts, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

    console.log(posts);

  if (isLoading) {
    return <Typography>Loading posts...</Typography>;
  }

  if (error) {
    return <Typography>Error loading posts</Typography>;
  }


  return (
    <div>
      <Typography variant="h4">Home</Typography>

      {posts?.map((post: any) => (
        <div key={post.id}>
          <img src={post.imageUrl} width={300} />
          <Typography>{post.user?.username}</Typography>
          <Typography>Likes: {post.likes?.length}</Typography>
        </div>
      ))}
    </div>
  );
}

export { Home as Component };