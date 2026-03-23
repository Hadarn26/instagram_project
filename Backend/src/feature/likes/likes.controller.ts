import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import type { IPost } from '../../entities/post/post.interface';
import { LikesLogic } from './likes.logic';
import { LikeToggleDto } from './dto/like-toggle.dto';
import { UserLikeDto } from './dto/user-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesLogic: LikesLogic) {}
  @Post(':postLikeId')
  async toggleLike(
    @Param('postLikeId', new ParseIntPipe()) postLikeId: IPost['id'],
    @Body() dto: UserLikeDto,
  ): Promise<LikeToggleDto> {
    return this.likesLogic.toggleLike(postLikeId, dto.userId);
  }
}
