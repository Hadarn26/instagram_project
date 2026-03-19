import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PostsLogic } from './posts.logic';
import { PostFeedDto } from './dto/post-feed.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from '../../entities/post/post.entity';
import type { User } from '../../entities/user/user.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsLogic: PostsLogic) {}

  @Get(':userId')
  async getAllPosts(
    @Param('userId', new ParseIntPipe() ) userId: User['id'],
  ): Promise<PostFeedDto[]> {
    return this.postsLogic.getAllPosts(userId);
  }

  @Get('user/:id')
  async getPostsByUser(
    @Param('id', new ParseIntPipe() ) id: User['id'],
  ): Promise<PostFeedDto[]> {
    return this.postsLogic.getPostsByUser(id);
  }

  @Post()
  async createPost(
    @Body() dto: CreatePostDto,
  ): Promise<PostEntity> {
    return this.postsLogic.createPost(dto);
  }
}