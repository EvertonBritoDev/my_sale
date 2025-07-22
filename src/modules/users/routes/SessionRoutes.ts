import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchemaValidation } from "../schemas/SessionSchema";

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionsRouter.post('/',sessionSchemaValidation,sessionsControllers.create);

export default sessionsRouter
