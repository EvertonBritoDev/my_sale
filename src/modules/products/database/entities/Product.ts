import { Order } from "@modules/orders/database/entities/Order";
import { Ordersproducts } from "@modules/orders/database/entities/OrderProducts";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class Product{
  @PrimaryGeneratedColumn()
  id:string;

  @OneToMany(() => Ordersproducts, ordersproducts => ordersproducts.product)
  order_products: Ordersproducts[]

  @Column({type: "text"})
  name:string;

  @Column({type: "decimal"})
  price:number;

  @Column({type: "int"})
  quantity:number;

  @CreateDateColumn({type: "timestamp"})
  create_at:Date;

  @UpdateDateColumn({type: "timestamp"})
  updated_at:Date;

}
