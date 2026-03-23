import { Injectable } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostFeedDto } from './dto/post-feed.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';
import type { IUser } from '../../entities/user/user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsLogic {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
  ) {}

  async getAllPosts(userId: IUser['id']): Promise<PostFeedDto[]> {
    const posts: Post[] = await this.postsService.findAllPosts();
    return PostFeedDto.fromEntities(posts, userId);
  }

  async getPostsByUser(userId: IUser['id']): Promise<PostFeedDto[]> {
    const posts: Post[] = await this.postsService.findPostsByUser(userId);
    return PostFeedDto.fromEntities(posts, userId);
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    const user: User | null = await this.usersService.findUserById(dto.userId);

    if (!user) throw new Error('User not found');

    return this.postsService.savePost(dto.imageUrl, user);
  }
}
