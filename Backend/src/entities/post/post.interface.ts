import { IUser } from '../user/user.interface';
import { ILike } from '../like/like.interface';

export interface IPost {
  id: number;
  imageUrl: string;
  user: IUser;
  likes: ILike[];
}
