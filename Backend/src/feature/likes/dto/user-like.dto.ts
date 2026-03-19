import { User } from '../../../entities/user/user.entity';

export class UserLikeDto {
  userId: User['id'];
}