import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user";
import { Like } from "./like";

@Entity()
export class Post {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imageUrl: string;

  @Column()
  description: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Like, like => like.post)
  likes: Like[];
}