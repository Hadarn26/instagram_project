import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import type { User } from '../../entities/user/user.entity';
import { UsersLogic } from './users.logic';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersLogic: UsersLogic) {}

  @Get(':id')
  async getUser(
    @Param('id', new ParseIntPipe() ) id: User['id'],
  ): Promise<UserProfileDto> {
    return this.usersLogic.getUser(id);
  }
}