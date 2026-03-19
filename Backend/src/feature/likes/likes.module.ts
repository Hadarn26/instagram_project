import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LikesController } from './likes.controller'
import { LikesService } from './likes.service'
import { LikesLogic } from './likes.logic'

import { Like } from '../../entities/like/like.entity'
import { Post } from '../../entities/post/post.entity'
import { User } from '../../entities/user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post, User])
  ],
  controllers: [LikesController],
  providers: [LikesService, LikesLogic],
  exports: [LikesService],
})
export class LikesModule {}