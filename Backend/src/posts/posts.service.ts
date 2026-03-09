import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entities/post';
import { User } from '../entities/user';

@Injectable()
export class PostsService {
  private postRepository: Repository<Post>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.postRepository = this.dataSource.getRepository(Post);
    this.userRepository = this.dataSource.getRepository(User);
  }

  async getAllPosts() {
    const posts = await this.postRepository.find({
      relations: ['user', 'likes'],
      order: {
        id: 'DESC',
      },
    });

    return posts.map((post) => ({
      id: post.id,
      imageUrl: post.imageUrl,
      description: post.description,
      user: post.user,
      likesCount: post.likes ? post.likes.length : 0,
    }));
  }

  async createPost(imageUrl: string, description: string) {
    const hardcodedUserId = 1;

    const user = await this.userRepository.findOne({
      where: { id: hardcodedUserId },
    });

    if (!user) {
      throw new Error('Hardcoded user was not found in database');
    }

    const newPost = this.postRepository.create({
      imageUrl,
      description,
      user,
    });

    return await this.postRepository.save(newPost);
  }
}