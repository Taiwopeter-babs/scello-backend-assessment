import { Router } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { productRouter } from "./products";
import { apiV1Options } from "./swagger-docs/swaggerConfig";

export const v1Route = Router();

// API DOCUMENATION
const specs = swaggerJsdoc(apiV1Options);
v1Route.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

v1Route.use("/products", productRouter);
