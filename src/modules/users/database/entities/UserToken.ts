import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user_tokens')
export class UserToken{

  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  @Generated('uuid')
  token:string;

  @Column()
  user_id:number;

  @CreateDateColumn({type: "timestamp"})
  create_at:Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at:Date;

}
