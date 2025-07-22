import { Product } from "../database/entities/Product";
import { productRepositories } from "../database/repositories/ProductsRepositories";
export default class ListProductService{
  async execute(): Promise<Product[]>{
      const products = await productRepositories.find();
      return products

    //const products = {id: 1, name: 'teste',price: 1800, quantity: 1}


  }
}
