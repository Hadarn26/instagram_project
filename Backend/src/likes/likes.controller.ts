import { Body, Controller, Post } from '@nestjs/common'
import { LikesService } from './likes.service'

@Controller('likes')
export class LikesController {

  constructor(private readonly likesService: LikesService) {}

  @Post()
  async addLike(@Body('postId') postId: number) {
    return await this.likesService.addLike(postId)
  }

}