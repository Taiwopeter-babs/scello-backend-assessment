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

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *       - Products
 *     summary: Returns all products Paginated (20 per request).
 *     parameters:
 *          - in: query
 *            name: startingAfter
 *            schema:
 *              type: string
 *          - in: query
 *            name: endingBefore
 *            schema:
 *              type: string
 *
 *          - in: query
 *            name: name
 *            schema:
 *              type: string
 *              nullable: true
 *            description: The name of the product to filter by. Supports partial matches.
 *
 *          - in: query
 *            name: category
 *            schema:
 *              type: string
 *              nullable: true
 *            description: The category to filter by.
 *
 *          - in: query
 *            name: minPrice
 *            schema:
 *              type: integer
 *              nullable: true
 *            description: The minimum price to filter by.
 *
 *          - in: query
 *            name: maxPrice
 *            schema:
 *              type: integer
 *              nullable: true
 *            description: The maximum ticket price to filter by.
 *
 *          - in: query
 *            name: sortName
 *            schema:
 *              type: string
 *              enum:
 *               - asc
 *               - desc
 *              nullable: true
 *            description: Sorts the products by name in ascending or descending order.
 *
 *          - in: query
 *            name: sortPrice
 *            schema:
 *              type: string
 *              enum:
 *               - asc
 *               - desc
 *              nullable: true
 *            description: Sorts the products by price in ascending or descending order.
 *
 *          - in: query
 *            name: sortStockQuantity
 *            schema:
 *              type: string
 *              nullable: true
 *            description: Sorts the products by their names in ascending or descending order.

 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 prevCursor:
 *                    type: string
 *                 nextCursor:
 *                    type: string
 */

productRouter.get("/", productController.getProducts);

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     tags:
 *       - Products
 *     summary: Creates a product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ProductCreate'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Product'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorArray'
 *                 - $ref: '#/components/schemas/Error'
 */
productRouter.post("/", validateProductBody, productController.addProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     tags:
 *       - Products
 *     summary: Returns a product
 *     parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: number
 *            required: true
 *
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
productRouter.get("/:id", validateIdParameter, productController.getProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     tags:
 *       - Products
 *     summary: Delete a product
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the product to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not Found Error
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 *       '400':
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/Error'
 */
productRouter.delete("/:id", validateIdParameter, productController.deleteProduct);

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     tags:
 *       - Products
 *     summary: Updates an event.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The id of the product to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ProductUpdate'
 *     responses:
 *       '204':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 event:
 *                   $ref: '#/components/schemas/Event'
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad Request Error
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorArray'
 *                 - $ref: '#/components/schemas/Error'
 */
productRouter.put(
  "/:id",
  validateIdParameter,
  validateProductUpdateBody,
  productController.updateProduct
);
