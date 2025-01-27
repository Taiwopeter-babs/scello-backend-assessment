import { Request, Response } from "express";
import ProductService from "./product.service";
import { ProductCreate, ProductQuery, ProductUpdate } from "./product.types";

export default class ProductController {
  private _productService: ProductService;
  constructor(productService: ProductService) {
    this._productService = productService;
  }

  getProducts = async (request: Request, response: Response) => {
    const queryParams = request.query as ProductQuery;

    const { statusCode, error, data, success } = await this._productService.getProducts(
      queryParams
    );

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  getProduct = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { statusCode, error, data, success } = await this._productService.getProduct(Number(id));

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  deleteProduct = async (request: Request, response: Response) => {
    const { id } = request.params;

    const { statusCode, error, data, success } = await this._productService.deleteProduct(
      Number(id)
    );

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };

  updateProduct = async (request: Request, response: Response) => {
    const { id } = request.params;
    const dataForUpdate = request.body as ProductUpdate;

    const { statusCode, error, success, message } = await this._productService.updateProduct(
      Number(id),
      dataForUpdate
    );

    const dataToReturn = success ? { message } : { error };

    response.status(statusCode).json({ dataToReturn });
  };

  addProduct = async (request: Request, response: Response) => {
    const dataToCreate = request.body as ProductCreate;

    const { statusCode, error, data, success } = await this._productService.addProduct(
      dataToCreate
    );

    const dataToReturn = success ? data : { error };

    response.status(statusCode).json(dataToReturn);
  };
}
