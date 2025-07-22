import { AppDataSource } from "@shared/typeorm/data-source";
import { User } from "../entities/User";

export const usersRepositories = AppDataSource.getRepository(User).extend({
  async findByName(name:string): Promise<any> {
    try {
      return this.findOneBy({name});
    } catch (error) {
      console.log('name', error)
    }

  },

  async findById(id: number):Promise<any>{
    try {
      return this.findOneBy({id})
    } catch (error) {
      console.log('id',error)
    }

  },

  async findByEmail(email:string):Promise<any>{
    try {
      return this.findOneBy({email});
    } catch (error) {
      console.log('email',error)
    }

  }
})
