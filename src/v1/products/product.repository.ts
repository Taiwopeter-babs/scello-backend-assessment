import { sequelize } from "@/database";
import { Product } from "@/models";
import { Repository } from "sequelize-typescript";
import { ProductCreate, ProductQuery, ProductUpdate } from "./product.types";
import { Op, OrderItem, WhereOptions } from "sequelize";
import { Pagination } from "../pagination";
import { IPageData } from "@src/shared";
import { IResult, Result } from "../result";

export class ProductRepository extends Pagination {
  private _productRepo: Repository<Product>;
  constructor() {
    super();
    this._productRepo = sequelize.getRepository(Product);
  }

  async getProducts(queryParams: ProductQuery = {}): Promise<IResult<IPageData<Product[]>>> {
    const {
      name,
      sortName,
      sortPrice,
      sortStockQuantity,
      startingAfter,
      endingBefore,
      category,
      minPrice,
      maxPrice,
    } = queryParams;

    const { limit, offset, navigationDirection } = this.getCursorBasedPaginationQuery({
      startingAfter,
      endingBefore,
    });

    // sort price query
    const filterPriceQuery =
      minPrice || maxPrice
        ? {
            price: {
              ...(minPrice && { [Op.gte]: minPrice }),
              ...(maxPrice && { [Op.lte]: maxPrice }),
            },
          }
        : undefined;

    // Dynamically create the "where" conditions
    const whereConditions: WhereOptions = {
      ...filterPriceQuery,
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(category && { category: { [Op.eq]: category } }),
    };

    const sorts: OrderItem[] = [];

    // Return the latest data if any sorting parameters are not included
    if (!sortName && !sortPrice && !sortStockQuantity) {
      sorts.push([
        "createdAt",
        navigationDirection === "forward" || navigationDirection === "none" ? "DESC" : "ASC",
      ]);
    }

    if (sortName) sorts.push(["name", sortName === "asc" ? "ASC" : "DESC"]);

    if (sortPrice) sorts.push(["price", sortPrice === "asc" ? "ASC" : "DESC"]);

    if (sortStockQuantity)
      sorts.push(["stockQuantity", sortStockQuantity === "asc" ? "ASC" : "DESC"]);

    try {
      const products = await this._productRepo.findAll({
        where: whereConditions,
        limit,
        offset,
        order: [...sorts],
      });

      const data = await this.getPaginationData(products, navigationDirection);

      return Result.Ok(data);
    } catch (error) {
      return Result.ServerError("An error occurred while fetching products");
    }
  }

  async getProductById(productId: number): Promise<IResult<Product>> {
    try {
      const product = await this._productRepo.findOne({
        where: { id: productId },
      });

      return product ? Result.Ok(product) : Result.NotFound("Product was not found");
    } catch (error) {
      return Result.ServerError("An error occurred while fetching product");
    }
  }

  async addProduct(productData: ProductCreate): Promise<IResult<Product>> {
    try {
      const productExists = await this._productRepo.findOne({
        where: { name: { [Op.like]: productData.name } },
        attributes: ["id"],
      });

      if (productExists) return Result.BadRequest("Product with name already exists");

      const product = await this._productRepo.create({
        ...productData,
      });

      return Result.Created(product);
    } catch (error) {
      return Result.ServerError("An error occurred while creating product");
    }
  }

  async updateProduct(productId: number, productData: ProductUpdate): Promise<IResult<Product>> {
    try {
      const productExists = await this._productRepo.findOne({
        where: { id: productId },
        attributes: ["id"],
      });

      if (!productExists) return Result.NotFound("Product was not found");

      await this._productRepo.update({ ...productData }, { where: { id: productId } });

      return Result.Updated("Product updated");
    } catch (error) {
      return Result.ServerError("An error occurred while updating product");
    }
  }

  async deleteProduct(productId: number) {
    try {
      const productExists = await this._productRepo.findOne({
        where: { id: productId, attributes: ["id"] },
      });

      if (!productExists) return Result.NotFound("Product was not found");

      await this._productRepo.destroy({ where: { id: productId } });

      return Result.Ok();
    } catch (error) {
      return Result.ServerError("An error occurred while creating product");
    }
  }
}

export default new ProductRepository();
