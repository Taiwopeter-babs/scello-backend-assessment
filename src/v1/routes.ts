import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";

import { productRouter } from "./products";
import path from "path";
import { userRouter } from "./users";
import passport from "passport";
import { authRouter, passportService } from "./authentication";

const filePath = path.join(__dirname, "swagger-docs", "v1.yml");
const file = fs.readFileSync(filePath, "utf8");
const swaggerDocument = YAML.parse(file);

export const v1Route = Router();

// Passport Auth
passport.use(passportService.jwtStrategy());
passport.use(passportService.localStrategy());

v1Route.use(passport.initialize());

v1Route.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

v1Route.use("/products", productRouter);
v1Route.use("/users", userRouter);
v1Route.use("/auth", authRouter);
