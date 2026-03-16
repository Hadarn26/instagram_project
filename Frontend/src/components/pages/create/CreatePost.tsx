import {
    Box,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/router/routes";
import { useState } from "react";
import Header from "../../Header/Header";
import { createPost } from "../../../services/post";
import { useCurrentUser } from "../../../hooks/core/useCurrentUser";

function CreatePost() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");

    const { data: user } = useCurrentUser();

    const handleCreate = async () => {
        if (!user) return;

        try {
            await createPost(imageUrl, user.id);
            navigate(ROUTES.HOME);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 420,
                margin: "0 auto",
                minHeight: "100vh",
                bgcolor: "white"
            }}
        >
            <Header
                title="Create New Post"
                leftIcon={
                    <IconButton onClick={() => navigate(ROUTES.HOME)}>
                        <CloseIcon />
                    </IconButton>
                }
            />

            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2
                }}
            >
                <TextField
                    label="Photo url"
                    placeholder="Create a new post with the specified URL"
                    variant="standard"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    fullWidth
                />

                <Button
                    variant="contained"
                    disabled={!imageUrl}
                    onClick={handleCreate}
                >
                    CREATE
                </Button>
            </Box>
        </Box>
    );
}

export { CreatePost as Component };