import { Router } from "express";
import UsersControllers from "../controllers/UsersController";
import { createUserSchema } from "../schemas/UserSchemas";

const usersRouter = Router();

const usersControllers = new UsersControllers();

usersRouter.get('/',usersControllers.index);
usersRouter.post('/',createUserSchema,usersControllers.create);

export default usersRouter;
