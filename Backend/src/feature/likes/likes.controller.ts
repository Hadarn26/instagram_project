import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import type { Post as PostEntity } from '../../entities/post/post.entity';
import { LikesLogic } from './likes.logic';
import { LikeToggleDto } from './dto/like-toggle.dto';
import { UserLikeDto } from './dto/user-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesLogic: LikesLogic) {}

  @Post(':postId')
  async toggleLike(
    @Param('postId', new ParseIntPipe() ) postId: PostEntity['id'],
    @Body() dto: UserLikeDto,
  ): Promise<LikeToggleDto> {
    return this.likesLogic.toggleLike(postId, dto.userId);
  }
}