import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

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
  };
};

export default function PostCard({ post }: PostCardProps) {
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
          aspectRatio: "1 / 1",
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ py: 1 }}>
        <Typography variant="body2">
          ❤️ {post.likesCount} likes
        </Typography>
      </CardContent>
    </Card>
  );
}