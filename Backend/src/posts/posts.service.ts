import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entities/post';
import { User } from '../entities/user';
import { Like } from '../entities/like';

@Injectable()
export class PostsService {
    private postRepository: Repository<Post>;
    private userRepository: Repository<User>;

    constructor(private dataSource: DataSource) {
        this.postRepository = this.dataSource.getRepository(Post);
        this.userRepository = this.dataSource.getRepository(User);
    }

    async getAllPosts(currentUserId: number) {
        const posts = await this.postRepository.find({
            relations: ['user', 'likes', 'likes.user'],
            order: {
                id: 'DESC',
            },
        });

        return posts.map((post) => ({
            id: post.id,
            imageUrl: post.imageUrl,
            user: post.user,
            likesCount: post.likes?.length ?? 0,

            likedByCurrentUser: post.likes.some(
                (like) => like.user?.id === currentUserId
            ),
        }));
    }

    async createPost(imageUrl: string, userId: number) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        if (!user) {
            throw new Error('User was not found in database');
        }

        const newPost = this.postRepository.create({
            imageUrl,
            user,
        });

        return await this.postRepository.save(newPost);
    }

    async toggleLike(postId: number, userId: number) {
        const likeRepository = this.dataSource.getRepository(Like);

        const existingLike = await likeRepository.findOne({
            where: {
                post: { id: postId },
                user: { id: userId },
            },
            relations: ['post', 'user'],
        });

        if (existingLike) {
            await likeRepository.remove(existingLike);

            const post = await this.postRepository.findOne({
                where: { id: postId },
                relations: ['likes'],
            });

            return {
                liked: false,
                likesCount: post?.likes?.length ?? 0,
            };
        }

        const user = await this.userRepository.findOne({
            where: { id: userId },
        });

        const post = await this.postRepository.findOne({
            where: { id: postId },
        });

        if (!user || !post) {
            throw new Error('User or post not found');
        }

        const newLike = likeRepository.create({
            user,
            post,
        });

        await likeRepository.save(newLike);

        const updatedPost = await this.postRepository.findOne({
            where: { id: postId },
            relations: ['likes'],
        });

        return {
            liked: true,
            likesCount: updatedPost?.likes?.length ?? 0,
        };
    }
}