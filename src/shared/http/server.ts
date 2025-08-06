import 'express-async-errors'
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import express from "express";
import cors from 'cors'
import routes from "./routes";
import { AppDataSource } from '@shared/typeorm/data-source';
import { errors } from 'celebrate';
import rateLimiter from '@shared/middlewares/RateLimiter';

AppDataSource.initialize()
  .then(async() => {

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(rateLimiter)
    app.use(routes);
    app.use(errors());
    app.use(ErrorHandleMiddleware.haddleError)

    console.error('Connected to the database')

    app.listen(3333, () => {
      console.log('Server started on port 3333')
    })
  }).catch(error => {
    console.error('Failed to connect to the database')
  })



