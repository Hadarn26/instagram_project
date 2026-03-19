import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from '../../entities/like/like.entity';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikesService {

  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findLike(postId: Post['id'], userId: User['id']): Promise<Like | null> {
    return this.likeRepository.findOne({
      where: { post: { id: postId }, user: { id: userId } },
    });
  }

  findUser(userId: User['id']): Promise<User | null> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  findPost(postId: Post['id']): Promise<Post | null> {
    return this.postRepository.findOne({ where: { id: postId } });
  }

  removeLike(like: Like): Promise<Like> {
    return this.likeRepository.remove(like);
  }

  addLike(user: User, post: Post): Promise<Like> {
    const like = this.likeRepository.create({ user, post });
    return this.likeRepository.save(like);
  }

  countLikes(postId: Post['id']): Promise<number> {
    return this.likeRepository.count({
      where: { post: { id: postId } },
    });
  }
}