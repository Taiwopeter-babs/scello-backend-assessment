import { Router } from "express";
import ProductController from "./product.controller";
import ProductService from "./product.service";
import ProductRepository from "./product.repository";
import { validateIdParameter } from "@src/shared/middleware";
import { validateProductBody, validateProductUpdateBody } from "./product.middleware";

export const productRouter = Router();

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

productRouter.get("/", productController.getProducts);

productRouter.post("/", validateProductBody, productController.addProduct);

productRouter.get("/:id", validateIdParameter, productController.getProduct);

productRouter.delete("/:id", validateIdParameter, productController.deleteProduct);

productRouter.put(
  "/:id",
  validateIdParameter,
  validateProductUpdateBody,
  productController.updateProduct
);
