import { Post } from '../../../entities/post/post.entity';
import { Like } from '../../../entities/like/like.entity';
import { User } from '../../../entities/user/user.entity';

export class PostFeedDto {
  id: Post['id'];
  imageUrl: Post['imageUrl'];
  user: {
    id: User['id'];
    username: string;
    profileImg: string | null;
  };
  likesCount: number;
  isLikedByCurrentUser: boolean;

  constructor(
    id: Post['id'],
    imageUrl: string,
    user: { id: User['id']; username: string; profileImg: string | null },
    likesCount: number,
    isLikedByCurrentUser: boolean,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.user = user;
    this.likesCount = likesCount;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
  }

  static fromEntity(post: Post, currentUserId: User['id']): PostFeedDto {
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

  static fromEntities(posts: Post[], currentUserId: User['id']): PostFeedDto[] {
    return posts.map((post) => this.fromEntity(post, currentUserId));
  }
}