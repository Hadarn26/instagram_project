import { User } from '../../../entities/user/user.entity';
import type { IUser } from '../../../entities/user/user.interface';

export class UserProfileDto {
  id: IUser['id'];
  username: IUser['username'];
  profileImg: IUser['profileImg'];

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.profileImg = user.profileImg;
  }

  static fromEntity(user: User): UserProfileDto {
    return new UserProfileDto(user);
  }
}
