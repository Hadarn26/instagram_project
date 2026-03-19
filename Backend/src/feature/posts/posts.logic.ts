import { Injectable } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostFeedDto } from './dto/post-feed.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';

@Injectable()
export class PostsLogic {
  constructor(private readonly postsService: PostsService) {}

  async getAllPosts(userId: User['id']): Promise<PostFeedDto[]> {
    const posts = await this.postsService.findAllPosts();
    return PostFeedDto.fromEntities(posts, userId);
  }

  async getPostsByUser(userId: User['id']): Promise<PostFeedDto[]> {
    const posts = await this.postsService.findPostsByUser(userId);
    return PostFeedDto.fromEntities(posts, userId);
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    const user = await this.postsService.findUser(dto.userId);

    if (!user) throw new Error('User not found');

    return this.postsService.savePost(dto.imageUrl, user);
  }
}