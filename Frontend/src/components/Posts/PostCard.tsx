import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../services/api";
import { useCurrentUser } from "../../hooks/core/useCurrentUser";
import { useState } from "react";

type PostCardProps = {
  post: {
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
};

export default function PostCard({ post }: PostCardProps) {
  const { data: user } = useCurrentUser();
  const queryClient = useQueryClient();

  const [likes, setLikes] = useState(post.likesCount);
    const [liked, setLiked] = useState(post.likedByCurrentUser);

  const mutation = useMutation({
    mutationFn: () => toggleLike(post.id, user?.id),

    onSuccess: (data) => {
      setLiked(data.liked);
      setLikes(data.likesCount);

      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleLike = () => {
    if (!user) return;
    mutation.mutate();
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 0,
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1.5,
          py: 1,
        }}
      >
        <Avatar src={post.user?.profileImg} sx={{ width: 32, height: 32 }} />
        <Typography variant="body2" fontWeight={500}>
          {post.user?.username || "user"}
        </Typography>
      </Box>

      <CardMedia
        component="img"
        image={post.imageUrl}
        alt="post image"
        sx={{
          width: "100%",
          aspectRatio: "4 / 3",
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ py: 1 }}>
        <IconButton onClick={handleLike}>
          {liked ? (
            <FavoriteIcon sx={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <Typography variant="body2">
          {likes} likes
        </Typography>
      </CardContent>
    </Card>
  );
}