import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikesLogic } from './likes.logic';

import { Like } from '../../entities/like/like.entity';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PostsModule, UsersModule],
  controllers: [LikesController],
  providers: [LikesService, LikesLogic],
  exports: [LikesService],
})
export class LikesModule {}
