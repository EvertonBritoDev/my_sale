import { Request, response, Response } from "express";
import { ShowOrderService } from "../services/ShowOrderService";
import { CreateOrderService } from "../services/CreateOrderService";



export default class OrderController{
  async show(req: Request, resp: Response): Promise<Response>{

    const {id} = req.params;
    const showOrder = new ShowOrderService()
    const order = await showOrder.execute(id)

    return resp.json(order)
  }

  async create(req: Request, resp: Response): Promise<Response>{

    const { customer_id, products } = req.body;
    const createOrder = new CreateOrderService();
    const order = await createOrder.execute({
      customer_id,
      products
    })
    console.log('return contro',order)
    const j = response.json(order)
    console.log('j')
    return response.json(order)

  }
}
