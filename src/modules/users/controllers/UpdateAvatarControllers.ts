import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { User } from "../database/entities/User";

export default class UpdateAvatarControllers{
    async update(request: Request, response: Response):Promise<Response>{

        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
          userId: Number(request.user.id),
          avatarFileName: request.file?.filename as string,
        });

        return response.json(user);

    }
}
