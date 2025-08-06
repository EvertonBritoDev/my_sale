import RedisCache from "@shared/cache/RedisCache";
import { Product } from "../database/entities/Product";
import { productRepositories } from "../database/repositories/ProductsRepositories";
export default class ListProductService{
  async execute(): Promise<Product[]>{
      const redisCache = new RedisCache();

      let products = await redisCache.recover<Product[]>(
        'api-mysales-PRODUCT_LIST',
      );

      if(!products){

        products = await productRepositories.find();
        await redisCache.save(
          'api-mysales-PRODUCT_LIST',
          JSON.stringify(products)
        );

      }

      //const products = await productRepositories.find();
      return products


  }
}
