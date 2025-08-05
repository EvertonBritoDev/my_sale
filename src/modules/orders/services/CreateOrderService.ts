import { Product } from "@modules/products/database/entities/Product";
import { Order } from "../database/entities/Order";
import { customerRepository } from "@modules/customers/database/repositories/CustomersRepositories";
import AppError from "@shared/errors/AppError";
import { productRepositories } from "@modules/products/database/repositories/ProductsRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";

interface ICreateOrder{
  customer_id: string;
  products: Product[]

}

export class CreateOrderService{
  async execute({customer_id, products}:ICreateOrder):Promise<Order>{
    //console.log('initial', typeof(customer_id))

    const customerExists = await customerRepository.findById(Number(customer_id))
    //console.log(customerExists,'exists')

    if(!customerExists){
      throw new AppError('Could not find any customer with the given id.');
    }
    const existProducts = await productRepositories.findAllByIds(products);
    if(!existProducts.length){
      throw new AppError('Could nor find any products.')
    }

    const productsIds = products.map(product => product.id)
    const checkInexistentProducts = products.filter(product => !productsIds.includes(product.id))
    //console.log(checkInexistentProducts,'inex',products,'prod - ',productsIds,'ids - ',products)
    /*
    if(!checkInexistentProducts.length){
      console.log('if !check')
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`, 404
      )
    }
    console.log('below qtd')
    */
    const quantityAvailable = products.filter(product => {
      existProducts.filter(prodExists => prodExists.id === product.id)[0].quantity < product.quantity;
    });
    //console.log(quantityAvailable,'qtd')

    if(quantityAvailable.length){
      throw new AppError (
        `The quantity is not available `, 409,
      )
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price:existProducts.filter(p => p.id === product.id)[0].price
    }))
    //console.log( serializedProducts,'sr')

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts
    })

    const {order_products} = order;
//    console.log( order_products,'o prod')
    const updateProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity: existProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }))
//    console.log(updateProductQuantity,'update prod')

    await productRepositories.save(updateProductQuantity)
    //console.log(order, 'order final')

    return order;

  }
}
