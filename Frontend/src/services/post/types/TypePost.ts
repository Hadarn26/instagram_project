import { TUser } from "../../user/types/TypeUser";

export type TPost = {
  id: number;
  imageUrl: string;
  user: {
    id: TUser["id"];
    username: TUser["username"];
    profileImg?: TUser["profileImg"];
  };
  likesCount: number;
  isLikedByCurrentUser: boolean;
};
