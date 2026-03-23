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
import {
  cardStyles,
  userRowStyles,
  avatarStyles,
  imageStyles,
  contentStyles,
  likedIconStyles,
} from "./PostStyle";
import { TPost } from "../../../services/post/types/TypePost";
import { useToggleLikeMutation } from "../../../services/like/hooks/useToggleLikeMutation";
import { useAtomValue } from "jotai";
import { userAtom } from "../../../store/userAtom";
import { handleLikePost } from "./post.utils";

type TPostCardProps = {
  post: TPost;
};

export default function PostCard({ post }: TPostCardProps) {
  const clickLike = useToggleLikeMutation();
  const user = useAtomValue(userAtom);

  const handleLikeClick = () => {
    handleLikePost({
      userId: user?.id ?? null,
      postId: post.id,
      isPending: clickLike.isPending,
      mutate: clickLike.mutate,
    });
  };

  return (
    <Card sx={cardStyles}>
      <Box sx={userRowStyles}>
        <Avatar src={post.user?.profileImg} sx={avatarStyles} />
        <Typography variant="body2" fontWeight={500}>
          {post.user?.username || "user"}
        </Typography>
      </Box>

      <CardMedia
        component="img"
        image={post.imageUrl}
        alt="post image"
        sx={imageStyles}
      />

      <CardContent sx={contentStyles}>
        <IconButton disabled={clickLike.isPending} onClick={handleLikeClick}>
          {post.isLikedByCurrentUser ? (
            <FavoriteIcon sx={likedIconStyles} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>

        <Typography variant="body2">{post.likesCount} likes</Typography>
      </CardContent>
    </Card>
  );
}
