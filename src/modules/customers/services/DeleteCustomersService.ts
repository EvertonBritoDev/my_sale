import AppError from "@shared/errors/AppError";
import Customers from "../database/entities/customers";
import { customerRepository } from "../database/repositories/CustomersRepositories";

interface IDeleteCustomer{
  id: number;
}

export default class DeleteCustomersService{
  async execute ({id}: IDeleteCustomer): Promise<void>{
    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found', 404)
    }

    await customerRepository.remove(customer);
  }
}
