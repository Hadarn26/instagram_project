import { IUser } from '../user/user.interface';
import { IPost } from '../post/post.interface';

export interface ILike {
  id: number;
  user: IUser;
  post: IPost;
}
