import AppError from "@shared/errors/AppError";
import { User } from "../database/entities/User";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import path from 'path'
import uploadconfig from '@config/upload'
import fs from 'fs'

interface IUpdateUserAvatar{
  userId: number;
  avatarFileName: string
}

export default class UpdateUserAvatarService{
  async execute({userId, avatarFileName}:IUpdateUserAvatar):Promise<User>{

    const user = await usersRepositories.findById(userId);
    console.log('not if',user)
    if(!user){
      throw new AppError('User not found.',404);
    }
    console.log('not if',user)
    if(user.avatar){
      const userAvatarFilePath = path.join(uploadconfig.directory, user.avatar);
          console.log(userAvatarFilePath)

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
          console.log(userAvatarFileExists)

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepositories.save(user);
    return user

  }
}
