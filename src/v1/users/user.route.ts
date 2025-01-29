import { Router } from "express";
import userController from "./user.controller";
import { validateIdParameter } from "@src/shared/middleware";
import { validateUserBody, validateUserUpdateBody } from "./user.middleware";
import passport from "passport";
import authController from "../authentication/auth.controller";
import { UserRole } from "@src/shared";

export const userRouter = Router();

userRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  userController.getUsers
);

userRouter.post("/", validateUserBody, userController.addUser);

userRouter.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateIdParameter,
  userController.getUser
);

userRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateIdParameter,
  userController.deleteUser
);

userRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authController.authorizeRole([UserRole.Admin]),
  validateIdParameter,
  validateUserUpdateBody,
  userController.updateUser
);
