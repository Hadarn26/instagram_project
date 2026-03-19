import { User } from '../../../entities/user/user.entity';

export class CreatePostDto {
    imageUrl: string;
    userId: User['id'];
}