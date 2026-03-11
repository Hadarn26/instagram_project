import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Post } from "./post";

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.likes)
    user: User;

    @ManyToOne(() => Post, post => post.likes)
    post: Post;
}