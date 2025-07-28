import AppError from "@shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories"
import { userTokensRepositories } from "../database/repositories/UserTokensRepositories";
import { sendEmail } from "@config/email";

interface IForgotPassword{
  email:string
}
export default class SendForgotPasswordService{
  async execute ({email}:IForgotPassword):Promise<void>{
    const user = await usersRepositories.findByEmail(email);

    if (!user){
      throw new AppError ('User not found.',404);
    }

    const token = await userTokensRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: 'My sales recovery password',
      body: `
      <html>
      <div>
        <head>
          <style> body { font-family: Arial, sans-serif; } </style>
        </head>
        <body> <h1>Verificação de Redefinição de Senha</h1>
          <h3>Caro ${user.name},</h3>
          <p>Recupere sua senha com este token: ${token?.token} </p>
        </body>
      </html>
      </div>
      `
    })

  }
}
