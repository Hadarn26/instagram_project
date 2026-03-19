import { User } from '../../../entities/user/user.entity';

export class UserProfileDto {
  id: User['id'];
  username: User['username'];
  profileImg: User['profileImg'];

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.profileImg = user.profileImg;
  }

  static fromEntity(user: User): UserProfileDto {
    return new UserProfileDto(user);
  }
}