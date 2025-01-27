import { Router } from "express";
import { productRouter } from "./products";

export const v1Route = Router();

v1Route.use("/products", productRouter);
