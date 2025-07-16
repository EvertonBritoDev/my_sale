import { Product } from "../entities/Product";
import { productRepositories } from "../repositories/ProductsRepositories";
export default class ListProductService{
  async execute(): Promise<Product[]>{
    const products = await productRepositories.find();
    return products
  }
}
