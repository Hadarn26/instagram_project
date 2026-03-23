export class LikeToggleDto {
  isLikedByCurrentUser: boolean;
  likesCount: number;

  constructor(isLikedByCurrentUser: boolean, likesCount: number) {
    this.isLikedByCurrentUser = isLikedByCurrentUser;
    this.likesCount = likesCount;
  }

  static fromValues(
    isLikedByCurrentUser: boolean,
    likesCount: number,
  ): LikeToggleDto {
    return new LikeToggleDto(isLikedByCurrentUser, likesCount);
  }
}