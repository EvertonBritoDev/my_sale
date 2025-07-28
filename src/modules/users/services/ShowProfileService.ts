import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";


interface IShowProfile{
  user_id: number;
}
export default class ShowProfileService{
  async execute({user_id}: IShowProfile): Promise<User>{
    const user = await usersRepositories.findById(user_id);

    if (!user){
      throw new AppError('User not found', 404);
    }

    return user

  }
}
