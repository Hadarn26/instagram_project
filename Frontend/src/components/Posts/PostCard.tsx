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
import { useToggleLikeMutation } from "../../services/post";
import { useCurrentUser } from "../../hooks/core/useCurrentUser";

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
    const mutation = useToggleLikeMutation();

    const handleLike = () => {
        if (!user) return;
        mutation.mutate({ postId: post.id, userId: user.id });
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
                    {post.likedByCurrentUser ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon />
                    )}
                </IconButton>

                <Typography variant="body2">
                    {post.likesCount} likes
                </Typography>
            </CardContent>
        </Card>
    );
}