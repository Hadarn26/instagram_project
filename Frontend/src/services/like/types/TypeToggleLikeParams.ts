import type { TUser } from "../../user/types/TypeUser";
import type { TPost } from "./TypePost";

export type TToggleLikeParams = {
    postId: TPost['id'];
    userId: TUser['id'];
};
