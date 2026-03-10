import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts();
  }

  @Post()
  async createPost(
    @Body('imageUrl') imageUrl: string,
  ) {
    return await this.postsService.createPost(imageUrl);
  }
}