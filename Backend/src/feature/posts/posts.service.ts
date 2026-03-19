import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post/post.entity';
import { User } from '../../entities/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAllPosts(): Promise<Post[]> {
    return this.postRepository.find({
      relations: ['user', 'likes', 'likes.user'],
      order: { id: 'DESC' },
    });
  }

  findPostsByUser(userId: User['id']): Promise<Post[]> {
  return this.postRepository.find({
    where: { user: { id: userId } },
    relations: ['user', 'likes', 'likes.user'],  
    order: { id: 'DESC' },
  });
}

  findUser(userId: User['id']): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }

  savePost(imageUrl: string, user: User): Promise<Post> {
    const post = this.postRepository.create({ imageUrl, user });
    return this.postRepository.save(post);
  }
}