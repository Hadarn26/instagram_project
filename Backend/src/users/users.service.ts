import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Post } from '../entities/post'
import { User } from '../entities/user'

@Injectable()
export class UsersService {

  private postRepository: Repository<Post>
  private userRepository: Repository<User>

  constructor(private dataSource: DataSource) {
    this.postRepository = this.dataSource.getRepository(Post)
    this.userRepository = this.dataSource.getRepository(User)
  }

  async getUserPosts(userId: number) {

    const user = await this.userRepository.findOne({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const posts = await this.postRepository.find({
      where: {
        user: { id: userId }
      },
      relations: ['likes'],
      order: {
        id: 'DESC'
      }
    })

    return posts.map(post => ({
      id: post.id,
      imageUrl: post.imageUrl,
      description: post.description,
      likesCount: post.likes.length
    }))
  }
}