import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { hash } from "bcrypt";

interface ICreateUser{
  name:string;
  email:string;
  password: string;
}

export default class CreateUSerService{
  async execute({name,email,password}: ICreateUser): Promise<any>{

    try {

      const emailExists = await usersRepositories.findByEmail(email);

    if(emailExists) {
      throw new AppError('Email addres already user', 409);
    }

    const hashedPassword = await hash(password,10);

    const user = usersRepositories.create({
      name,
      email,
      password:hashedPassword,
    })

    await usersRepositories.save(user)

    return user
    } catch (error) {
      console.log('error create', error)
    }


  }
}
