import { Injectable } from '@nestjs/common';
import { Like } from '../../entities/like/like.entity';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';
import type { IPost } from '../../entities/post/post.interface';
import type { IUser } from '../../entities/user/user.interface';
import { LikeToggleDto } from './dto/like-toggle.dto';
import { LikesService } from './likes.service';
import { UsersService } from '../users/users.service';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class LikesLogic {
  constructor(
    private readonly likesService: LikesService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  async toggleLike(
    postId: IPost['id'],
    userId: IUser['id'],
  ): Promise<LikeToggleDto> {
    const existingLike: Like | null = await this.likesService.findLike(
      postId,
      userId,
    );
    const user: User | null = await this.usersService.findUserById(userId);
    const post: Post | null = await this.postsService.findPostById(postId);

    if (!user || !post) throw new Error('User or post not found');

    if (existingLike) {
      await this.likesService.removeLike(existingLike);
      const count: number = await this.likesService.countLikes(postId);
      return new LikeToggleDto(false, count);
    }

    await this.likesService.addLike(user, post);
    const count: number = await this.likesService.countLikes(postId);
    return new LikeToggleDto(true, count);
  }
}
