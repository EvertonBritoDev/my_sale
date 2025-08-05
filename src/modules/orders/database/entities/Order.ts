
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ordersproducts } from "./OrderProducts";
import { Customers } from "@modules/customers/database/entities/customers";

@Entity('orders')

export class Order{

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customers)
  @JoinColumn({name: 'customer_id'})
  customer: Customers

  @OneToMany(() => Ordersproducts, orderProducts => orderProducts.order, {
    cascade:true
  })
  order_products: Ordersproducts[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
