import SendForgotPasswordService from "../services/SendForgotPasswordEmailservice";
import { Request, Response } from "express";

export default class ForgotPasswordController{
  async create(request: Request, response: Response):Promise<Response>{
    const {email} = request.body;

    const sendForgotPasswordService = new SendForgotPasswordService();

    await sendForgotPasswordService.execute({email});

    return response.status(204).json()

  }
}
