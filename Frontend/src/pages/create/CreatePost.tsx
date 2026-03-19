import {
    Box,
    TextField,
    Button,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/router/routes";
import { useState } from "react";
import { Header } from "../../shared/components/Header/Header";
import { pageContainerStyles, formContainerStyles } from "./CreatePostStyle";
import { userAtom } from "../../store/userAtom";
import { useAtomValue } from "jotai";
import { handleCreatePost } from "./CreatePost.utils";
import type { JSX } from "react";

export const CreatePost = (): JSX.Element => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState("");
    const user = useAtomValue(userAtom);

    return (
        <Box sx={pageContainerStyles}>
            <Header
                title="Create New Post"
                leftIcon={
                    <IconButton onClick={() => navigate(ROUTES.HOME)}>
                        <CloseIcon />
                    </IconButton>
                }
            />

            <Box sx={formContainerStyles}>
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
                    onClick={() =>
                        handleCreatePost(imageUrl, user.id, navigate)
                    }
                >
                    CREATE
                </Button>
            </Box>
        </Box>
    );
};