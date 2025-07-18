import ListProductService from "../database/services/ListProductService";
import { Request,response,Response } from "express";
import ShowProductService from "../database/services/ShowProductsService";
import CreateProductService from "../database/services/CreatProductService";
import UpdateProductService from "../database/services/UpdateProductService";
import DeleteProductService from "../database/services/DeleteProductService";

export default class ProductsControllers{
  async index(request:Request,response: Response): Promise<Response>{
    const listProductsService = new ListProductService();
    const products = await listProductsService.execute();
    return response.json(products);
  }
  async show(request:Request,response: Response): Promise<Response>{
    const {id} = request.params;
    const showProductService = new ShowProductService();
    const products = await showProductService.execute({id});
    return response.json(products);
  }

  async create(request:Request,response: Response): Promise<Response>{
    const {name, price, quantity} = request.body;
    const createProductService = new CreateProductService();
    const products = await createProductService.execute({name, price, quantity});

    return response.json(products)
  }

  async update(request:Request,response: Response): Promise<Response>{
    const {id} = request.params;
    const {name, price, quantity} = request.body;
    const updateProductService = new UpdateProductService();
    const products = await updateProductService.execute({id, name, price, quantity});

    return response.json(products)
  }

  async delete(request:Request,response: Response): Promise<Response>{
    const {id} = request.params;
    const deleteProductService = new DeleteProductService();
    const products = await deleteProductService.execute({id});

    return response.status(204).send([]);
  }

}
