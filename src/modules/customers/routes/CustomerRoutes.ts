import { Router } from "express";
import CustomersControllers from "../controllers/CustomersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { createCustomerSchema, idParamsValidate, updateCustomerSchema } from "../schemas/CustomerSchema";

const customerRouter = Router();
const customersControllers = new CustomersControllers();

customerRouter.use(AuthMiddleware.execute);
customerRouter.get('/',customersControllers.index);
customerRouter.get('/:id',idParamsValidate,customersControllers.show);
customerRouter.post('/', createCustomerSchema, customersControllers.create)
customerRouter.patch(
  '/:id',
  idParamsValidate,
  updateCustomerSchema,
  customersControllers.update,
)
customerRouter.delete('/:id', idParamsValidate, customersControllers.delete)

export default customerRouter
