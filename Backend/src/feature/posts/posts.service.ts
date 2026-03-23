import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { User } from '../../entities/user/user.entity';
import type { IPost } from '../../entities/post/post.interface';
import type { IUser } from '../../entities/user/user.interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAllPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'likes', 'likes.user'],
      order: { id: 'DESC' },
    });
  }

  findPostsByUser(userId: IUser['id']): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'likes', 'likes.user'],
      order: { id: 'DESC' },
    });
  }

  findPostById(postId: IPost['id']): Promise<Post | null> {
    return this.postRepository.findOne({
      where: { id: postId },
    });
  }

  savePost(imageUrl: string, user: User): Promise<Post> {
    const post = this.postRepository.create({ imageUrl, user });
    return this.postRepository.save(post);
  }
}
