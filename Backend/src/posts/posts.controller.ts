import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

@Get(':userId')
async getAllPosts(@Param('userId') userId: number) {
  return await this.postsService.getAllPosts(Number(userId));
}

  @Post()
  async createPost(
    @Body('imageUrl') imageUrl: string,
    @Body('userId') userId: number
  ) {
    return await this.postsService.createPost(imageUrl, userId);
  }

  @Post(':id/like')
  async toggleLike(
    @Param('id') postId: number,
    @Body('userId') userId: number,
  ) {
  return await this.postsService.toggleLike(Number(postId), Number(userId));
  }
}