import { Injectable } from '@nestjs/common';
import { Like } from '../../entities/like/like.entity';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';
import { LikeToggleDto } from './dto/like-toggle.dto';
import { LikesService } from './likes.service';

@Injectable()
export class LikesLogic {
  constructor(private readonly likesService: LikesService) {}

  async toggleLike(postId: Post['id'], userId: User['id']): Promise<LikeToggleDto> {
    const existingLike = await this.likesService.findLike(postId, userId);
    const user = await this.likesService.findUser(userId);
    const post = await this.likesService.findPost(postId);

    if (!user || !post) throw new Error('User or post not found');

    if (existingLike) {
      await this.likesService.removeLike(existingLike);
      const count = await this.likesService.countLikes(postId);
      return new LikeToggleDto(false, count);
    }

    await this.likesService.addLike(user, post);
    const count = await this.likesService.countLikes(postId);
    return new LikeToggleDto(true, count);
  }
}