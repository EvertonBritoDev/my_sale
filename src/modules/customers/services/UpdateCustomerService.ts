import AppError from "@shared/errors/AppError";
import Customers from "../database/entities/customers";
import { customerRepository } from "../database/repositories/CustomersRepositories";

interface IUpdateCustomer{

  id: number;
  name: string;
  email: string;

}

export default class UpdateCustomerService{

  public async execute({id, name, email}: IUpdateCustomer): Promise<Customers>{
    const customer = await customerRepository.findById(id);

    if(!customer){
      throw new AppError('Customer nout found.', 404);
    }

    const customerExists = await customerRepository.findByEmail(email);

    if(customerExists && email !== customer.email){
      throw new AppError('There is alredy one customer with this email.', 409);
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }

}
