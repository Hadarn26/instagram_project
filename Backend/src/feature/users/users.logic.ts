import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user/user.entity';
import type { IUser } from '../../entities/user/user.interface';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersService } from './users.service';

@Injectable()
export class UsersLogic {
  constructor(private usersService: UsersService) {}

  async getUser(id: IUser['id']): Promise<UserProfileDto> {
    const user: User | null = await this.usersService.findUserById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return UserProfileDto.fromEntity(user);
  }
}
