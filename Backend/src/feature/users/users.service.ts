import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../entities/user/user.entity';
import { UsersLogic } from './users.logic';
import { UserProfileDto } from './dto/user-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserById(id: User['id']): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }
}