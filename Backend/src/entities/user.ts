import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Post } from "./post";
import { Like } from "./like";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Like, like => like.user)
  likes: Like[];
}