import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";

import { productRouter } from "./products";
import path from "path";

const filePath = path.join(__dirname, "swagger-docs", "index.yml");
const file = fs.readFileSync(filePath, "utf8");
const swaggerDocument = YAML.parse(file);

export const v1Route = Router();

v1Route.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

v1Route.use("/products", productRouter);
