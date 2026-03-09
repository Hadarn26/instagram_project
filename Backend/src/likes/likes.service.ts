import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { Like } from '../entities/like'
import { User } from '../entities/user'
import { Post } from '../entities/post'

@Injectable()
export class LikesService {

  private likeRepository: Repository<Like>
  private userRepository: Repository<User>
  private postRepository: Repository<Post>

  constructor(private dataSource: DataSource) {
    this.likeRepository = this.dataSource.getRepository(Like)
    this.userRepository = this.dataSource.getRepository(User)
    this.postRepository = this.dataSource.getRepository(Post)
  }

  async addLike(postId: number) {

    const hardcodedUserId = 1

    const user = await this.userRepository.findOne({
      where: { id: hardcodedUserId }
    })

      if (!user) {
    throw new Error('User not found')
  }

    const post = await this.postRepository.findOne({
      where: { id: postId }
    })

    if (!post) {
      throw new Error('Post not found')
    }

    const newLike = this.likeRepository.create({
      user,
      post
    })

    return await this.likeRepository.save(newLike)
  }
}