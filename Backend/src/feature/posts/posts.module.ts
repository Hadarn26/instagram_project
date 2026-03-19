import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { PostsLogic } from './posts.logic'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Post } from '../../entities/post/post.entity'
import { User } from '../../entities/user/user.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User])
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsLogic],
  exports: [PostsService],
})
export class PostsModule {}