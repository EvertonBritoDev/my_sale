import AppError from "@shared/errors/AppError";
import { NextFunction, request, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayLoad{
  iat:number;
  exp:number;
  sub:string;
}

export default class AuthMiddleware{
  static execute(req:Request, res:Response, next: NextFunction):void{
    const authHeader = req.headers.authorization;

      if(!authHeader){
        throw new AppError('JWT Token is missing.',401);
      }

      const [, token] = authHeader.split(' ');

      try {
        const decodedTokenn = verify(token,process.env.APP_SECRET as Secret)
        const{sub} = decodedTokenn as ITokenPayLoad;

        req.user = {
          id: sub
        }

        return next()

      } catch (error) {
        throw new AppError('Invalid JWT Token', 401);
      }
    }

}
