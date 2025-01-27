import ProductRepository from "./product.repository";
import { ProductCreate, ProductQuery, ProductUpdate } from "./product.types";

export default class ProductService {
  private _productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this._productRepository = productRepository;
  }

  async getProducts(queryParams: ProductQuery) {
    const productsData = await this._productRepository.getProducts(queryParams);

    return productsData;
  }

  async getProduct(id: number) {
    const productData = await this._productRepository.getProductById(id);

    return productData;
  }

  async deleteProduct(id: number) {
    const response = await this._productRepository.deleteProduct(id);

    return response;
  }

  async updateProduct(id: number, data: ProductUpdate) {
    const response = await this._productRepository.updateProduct(id, data);

    return response;
  }

  async addProduct(data: ProductCreate) {
    const productData = await this._productRepository.addProduct(data);

    return productData;
  }
}
