import ListProductService from "../services/ListProductService";
import { Request, Response } from "express";
import ShowProductService from "../services/ShowProductsService";
import CreateProductService from "../services/CreatProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";

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

  async create(request:Request,response: Response): Promise<any>{
    try {
      const {name, price, quantity} = request.body;
      const createProductService = new CreateProductService();
      const products = await createProductService.execute({name, price, quantity});

      return response.json(products)

    } catch (error) {
      console.log('erro dentro do create',error)
    }

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
