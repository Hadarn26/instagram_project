import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsLogic } from './posts.logic';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/post/post.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService, PostsLogic],
  exports: [PostsService],
})
export class PostsModule {}
