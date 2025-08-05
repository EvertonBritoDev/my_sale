import AppError from "@shared/errors/AppError";
import Customers from "../database/entities/customers";
import { customerRepository } from "../database/repositories/CustomersRepositories";

interface IShowCustomers{
  id: number;
}

export default class ShowCustomerService{
  public async execute({id}: IShowCustomers): Promise<Customers>{
    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer not found', 404);
    }

    return customer
  }
}
