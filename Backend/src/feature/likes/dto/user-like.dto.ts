import type { IUser } from '../../../entities/user/user.interface';

export class UserLikeDto {
  userId: IUser['id'];
}