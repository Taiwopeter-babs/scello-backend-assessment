import { Router } from "express";
import productController from "./product.controller";
import { validateIdParameter } from "@src/shared/middleware";
import { validateProductBody, validateProductUpdateBody } from "./product.middleware";
import passport from "passport";

import authController from "../authentication/auth.controller";
import { UserRole } from "@src/shared";

export const productRouter = Router();

productRouter.get("/", productController.getProducts);

productRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateProductBody,
  productController.addProduct
);

productRouter.get("/:id", validateIdParameter, productController.getProduct);

productRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateIdParameter,
  productController.deleteProduct
);

productRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateIdParameter,
  validateProductUpdateBody,
  productController.updateProduct
);
