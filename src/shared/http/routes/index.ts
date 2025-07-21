import productsRouter from '@shared/modules/products/routes/ProductRoutes';
import {Router} from 'express'

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({
    message: 'Hello Dev'
  })
})

routes.use('/products', productsRouter)

export default routes
