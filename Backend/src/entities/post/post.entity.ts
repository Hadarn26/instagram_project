import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../user/user.entity";
import { Like } from "../like/like.entity";
import { IPost } from "./post.interface";

@Entity()
export class Post implements IPost {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUrl: string;

    @ManyToOne(() => User, user => user.posts)
    user: User;

    @OneToMany(() => Like, like => like.post)
    likes: Like[];
}
