import Customers from "../database/entities/customers";
import { customerRepository } from "../database/repositories/CustomersRepositories";

export default class ListCustomerService{
  async execute(): Promise<Customers[]>{

    const customers = customerRepository.find();

    return customers

  }
}
