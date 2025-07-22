import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";

export default class ListUerService {
  async execute(): Promise<User[]>{
    const users = await usersRepositories.find();
    return users;
  }
}
