import { Post } from '../../../entities/post/post.entity';
import { Like } from '../../../entities/like/like.entity';
import type { IPost } from '../../../entities/post/post.interface';
import type { IUser } from '../../../entities/user/user.interface';

export class PostFeedDto {
  id: IPost['id'];
  imageUrl: IPost['imageUrl'];
  user: {
    id: IUser['id'];
    username: IUser['username'];
    profileImg: IUser['profileImg'];
  };
  likesCount: number;
  isLikedByCurrentUser: boolean;

  constructor(
    id: IPost['id'],
    imageUrl: string,
    user: {
      id: IUser['id'];
      username: IUser['username'];
      profileImg: IUser['profileImg'];
    },
    likesCount: number,
    isLikedByCurrentUser: boolean,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.user = user;
    this.likesCount = likesCount;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
  }

  static fromEntity(post: Post, currentUserId: IUser['id']): PostFeedDto {
    return new PostFeedDto(
      post.id,
      post.imageUrl,
      {
        id: post.user.id,
        username: post.user.username,
        profileImg: post.user.profileImg ?? null,
      },
      post.likes?.length ?? 0,
      post.likes.some((like: Like) => like.user?.id === currentUserId),
    );
  }

  static fromEntities(
    posts: Post[],
    currentUserId: IUser['id'],
  ): PostFeedDto[] {
    return posts.map((post) => this.fromEntity(post, currentUserId));
  }
}
