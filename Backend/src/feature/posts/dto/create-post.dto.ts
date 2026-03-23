import type { IUser } from '../../../entities/user/user.interface';

export class CreatePostDto {
  imageUrl: string;
  userId: IUser['id'];
}
