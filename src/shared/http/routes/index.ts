import {Router} from 'express'

const routes = Router();

routes.get('health', (request, response) => {
  return response.json({
    message: 'Hello Dev'
  })
})

export default routes
