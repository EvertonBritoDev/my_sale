import productsRouter from '@modules/products/routes/ProductRoutes';
import avatarRouter from '@modules/users/routes/AvatarRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import express,{Router} from 'express'
import uploadConfig from '@config/upload';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import customerRouter from '@modules/customers/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/routes/OrderRoutes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({
    message: 'Hello Dev'
  })
})

routes.use('/products', productsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions',sessionsRouter);
routes.use('/avatar',avatarRouter);
routes.use('/files',express.static(uploadConfig.directory))
routes.use('/password',passwordRouter)
routes.use('/profiles',profileRouter)
routes.use('/customer', customerRouter)
routes.use('/orders', ordersRouter);


export default routes
