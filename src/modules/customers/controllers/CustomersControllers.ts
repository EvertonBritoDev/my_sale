import { Response, Request } from "express";
import ListCustomerService from "../services/ListCustomersService";
import ShowCustomerService from "../services/ShowCustomersService";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomersService from "../services/DeleteCustomersService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersControllers{
  async index (request: Request, response: Response):Promise<Response>{
    const listCustomers = new ListCustomerService();
    const customers = await listCustomers.execute();
    return response.json(customers);
  }

  async show(request: Request, response: Response):Promise<Response>{
    const id = Number(request.params.id);
    const showCustomers = new ShowCustomerService();
    const customer = await showCustomers.execute({id})
    return response.json(customer)
  }

  async create(request: Request, response: Response):Promise<Response>{
    const {name, email} = request.body;
    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email
    });

    return response.json(customer)

  }

  async update(request: Request, response: Response):Promise<Response>{
    const {name, email} = request.body;
    const id = Number(request.params.id);
    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({
      id,
      name,
      email
    })
    return response.json(customer)
  }

  async delete(request: Request, response: Response):Promise<Response>{
    const id = Number(request.params.id);
    const deleteCustomer = new DeleteCustomersService();
    await deleteCustomer.execute({
      id
    })
    return response.json([])
  }

}
