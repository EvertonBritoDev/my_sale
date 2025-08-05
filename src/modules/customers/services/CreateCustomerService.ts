import AppError from "@shared/errors/AppError";
import Customers from "../database/entities/customers";
import { customerRepository } from "../database/repositories/CustomersRepositories";

interface ICreateCustomer{
  name: string;
  email: string
}

export default class CreateCustomerService{
  public async execute({name, email}:ICreateCustomer): Promise<Customers>{
    const emailExists = await customerRepository.findByEmail(email);

    if(emailExists){
      throw new AppError('Email address already used.',409);
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer
  }
}
