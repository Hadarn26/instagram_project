import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersLogic } from './users.logic'

import { User } from '../../entities/user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersLogic],
  exports: [UsersService]
})
export class UsersModule {}