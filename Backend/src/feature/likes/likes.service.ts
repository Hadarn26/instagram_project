import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from '../../entities/like/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Post as PostEntity } from '../../entities/post/post.entity';
import type { User as UserEntity } from '../../entities/user/user.entity';
import type { IPost } from '../../entities/post/post.interface';
import type { IUser } from '../../entities/user/user.interface';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
  ) {}

  findLike(postId: IPost['id'], userId: IUser['id']): Promise<Like | null> {
    return this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
  }

  removeLike(like: Like): Promise<Like> {
    return this.likeRepository.remove(like);
  }

  addLike(user: UserEntity, post: PostEntity): Promise<Like> {
    const like = this.likeRepository.create({ user, post });
    return this.likeRepository.save(like);
  }

  countLikes(postId: IPost['id']): Promise<number> {
    return this.likeRepository.count({
      where: { post: { id: postId } },
    });
  }
}
