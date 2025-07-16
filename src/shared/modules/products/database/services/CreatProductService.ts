import AppError from "@shared/errors/AppError";
import { Product } from "../entities/Product";
import { productRepositories } from "../repositories/ProductsRepositories";
interface ICreateProduct{
  name: string,
  price:number,
  quantity:number
}

export default class CreateProductService {
  async excute({name,price,quantity}:ICreateProduct): Promise<Product>{
    const productExists = await productRepositories.findByName(name)
    if(productExists){
      throw new AppError('There is already one product whith this name',409);
    }
    const product = productRepositories.create({
      name,
      price,
      quantity
    })

    await productRepositories.save(product)

    return product
  }
}
