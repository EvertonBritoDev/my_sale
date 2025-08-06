import AppError from "@shared/errors/AppError";
import { productRepositories } from "../database/repositories/ProductsRepositories";
import RedisCache from "@shared/cache/RedisCache";

interface IDeleteProduct{
  id:string
}

export default class DeleteProductService{
  async execute({id}:IDeleteProduct):Promise<void>{
    const redisCache = new RedisCache();
    const product = await productRepositories.findById(id);

    if(!product){
      throw new AppError('Product not found.',404)
    }
    await redisCache.invalidate('api-mysales-PRODUCT_LIST')
    await productRepositories.remove(product)

  }
}
