import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: "text"})
  name:string;

  @Column()
  email:string;

  @Column()
  @Exclude()
  password:string;

  @Column()
  avatar:string;

  @CreateDateColumn({type: "timestamp"})
  create_at:Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at:Date;

  @Expose({name: 'avatar_url'})
  getAvatarUrl(): string | null {
    if(!this.avatar) return null
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }

}
