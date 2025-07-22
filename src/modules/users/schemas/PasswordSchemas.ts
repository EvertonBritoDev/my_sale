import { celebrate, Joi, Segments } from "celebrate";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

export const ForgotPasswordSchema =celebrate({
  [Segments.BODY]:{
    email:Joi.string().email().required(),
  }
});

export const ResetPasswordSchema = celebrate({
  [Segments.BODY]:{
    token: Joi.string().uuid().required(),
    password: Joi.string().required(),
    password_confirmation: Joi.string().valid(Joi.ref('password')).required(),
  }
})
