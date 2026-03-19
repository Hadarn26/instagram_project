import { Box, Avatar, Typography } from "@mui/material";
import { Header } from "../../shared/components/Header/Header";
import PostCard from "../../shared/components/Posts/PostCard";
import { BottomNav } from "../../shared/components/BottomNav/BottomNav";
import PersonIcon from "@mui/icons-material/Person";
import { pageContainerStyles, contentContainerStyles, profileHeaderStyles, avatarStyles, usernameStyles } from "./ProfileStyle";
import { useGetUserPosts } from "../../services/post/hooks/useGetUserPosts";
import { userAtom } from "../../store/userAtom";
import { useAtomValue } from "jotai";
import { TPost } from "../../services/post/types/TypePost";
import type { JSX } from "react";

export const Profile = (): JSX.Element => {

    const user = useAtomValue(userAtom);
    const { userPosts: userPosts } = useGetUserPosts();

     return (
        <Box sx={pageContainerStyles}>
            <Header title={user?.username || "profile"} />

            <Box sx={contentContainerStyles}>
                <Box sx={profileHeaderStyles}>
                    <Avatar src={user?.profileImg} sx={avatarStyles}>
                        {!user?.profileImg && <PersonIcon fontSize="large" />}
                    </Avatar>

                    <Typography sx={usernameStyles}>
                        {user?.username}
                    </Typography>
                </Box>

                {userPosts?.map((post: TPost) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </Box>

            <BottomNav />
        </Box>
    );
};
