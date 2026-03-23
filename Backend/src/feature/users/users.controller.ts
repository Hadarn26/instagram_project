import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import type { IUser } from '../../entities/user/user.interface';
import { UsersLogic } from './users.logic';
import { UserProfileDto } from './dto/user-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersLogic: UsersLogic) {}

  @Get(':id')
  async getUser(
    @Param('id', new ParseIntPipe()) id: IUser['id'],
  ): Promise<UserProfileDto> {
    return this.usersLogic.getUser(id);
  }
}
