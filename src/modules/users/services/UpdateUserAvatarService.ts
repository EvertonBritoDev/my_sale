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
  async execute({userId, avatarFileName}:IUpdateUserAvatar):Promise<any>{ // any change to User

    try {
      const user = await usersRepositories.findById(userId);

    if(!user){
      throw new AppError('User not found.',404);
    }

    if(user.avatar){
      const userAvatarFilePath = path.join(uploadconfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepositories.save(user);
    return user
    } catch (error) {
      console.log('UpdateUserAvatarService',error)
    }

  }
}
