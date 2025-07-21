import { NumericType } from "typeorm"
import { productRepositories } from "../database/repositories/ProductsRepositories"
import AppError from "@shared/errors/AppError"
import { Product } from "../database/entities/Product"


interface IShowProduct{
  id:string
}

export default class ShowProductService{
  async execute ({id}: IShowProduct): Promise<Product>{

    const product = await productRepositories.findById(id)

    if(!product){
      throw new AppError('Product not found.',404);
    }

    return product
  }
}
