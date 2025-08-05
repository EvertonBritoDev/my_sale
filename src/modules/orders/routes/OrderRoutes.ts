import { Router } from "express"
import OrderController from "../controllers/OrderControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { createOrderValidate, idParamsValidate } from "../schemas/OrdersSchemas";

const ordersRouter = Router();
const ordersControllers = new OrderController();

ordersRouter.use(AuthMiddleware.execute);
console.log('routes')

ordersRouter.get('/:id',idParamsValidate, ordersControllers.show);
ordersRouter.post('/', createOrderValidate, ordersControllers.create);
export default ordersRouter;
