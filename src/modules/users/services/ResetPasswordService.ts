import AppError from "@shared/errors/AppError";
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import {isAfter, addHours} from 'date-fns'
import { hash } from "bcrypt";

interface IResetPassword{
  token: string;
  password: string;
}

export default class ResetPasswordService{
  async execute({token, password}: IResetPassword):Promise<void>{
    const userToken = await userTokensRepositories.findByToken(token);

    if(!userToken){
      throw new AppError('USer token not exists.',404);
    }

    const user = await usersRepositories.findById(userToken.id);

    if(!user){
      throw new AppError('User not exists.',404);
    }

    const tokenCreateAt = userToken.create_at;

    const compareDate = addHours(tokenCreateAt, 2);

    if(isAfter(Date.now(),compareDate)){
      throw new AppError('Token Expired',401);
    }

    user.password = await hash(password, 10);

    await usersRepositories.save(user)

  }
}
