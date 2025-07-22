import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({type: "text"})
  name:string;

  @Column()
  email:string;

  @Column()
  password:string;

  @Column()
  avatar:string;

  @CreateDateColumn({type: "timestamp"})
  create_at:Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at:Date;

}
