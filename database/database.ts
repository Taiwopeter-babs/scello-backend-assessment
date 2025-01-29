import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

import { Product, User } from "@/models";
import { CONFIG } from "@src/utils/config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  models: [Product, User],
  repositoryMode: true,
  logging: CONFIG.environment === "development" ? console.log : false,
});
