import { AppDataSource } from "@shared/typeorm/data-source";
import { Customers } from "../entities/customers";


export const customerRepository = AppDataSource.getRepository(Customers).extend({

  async findByName(name: string): Promise<Customers | null>{
    const customer = await this.findOneBy({
      name,
    });

    return customer
  },

  async findById(id: number): Promise<Customers | null> {
    const customer = await this.findOneBy({
      id,
    });
    return customer;
  },

  async findByEmail(email: string):Promise<Customers | null>{
    const customer = await this.findOneBy({
      email
    });

    return customer
  },

});
