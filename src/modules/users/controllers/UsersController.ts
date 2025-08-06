import { Request, Response } from "express";
import ListUerService from "../services/ListUserService";
import CreateUSerService from "../services/CreateUserService";
import { instanceToInstance } from "class-transformer";

export default class UsersControllers{
  async index(request:Request,response: Response): Promise<Response>{
    const listUsersService = new ListUerService();
    const users = await listUsersService.execute();
    return response.json(instanceToInstance(users)); //instanceToInstance for not show passaword ,insert above the field
    // Password the method @exclude
  }


  async create(request:Request,response: Response): Promise<Response>{

      const {name, email, password} = request.body;
      const createUserService = new CreateUSerService();
      const user = await createUserService.execute({name, email, password});

      return response.json(instanceToInstance(user))

  }


}
