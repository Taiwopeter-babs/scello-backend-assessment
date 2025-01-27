import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

import { Product } from "@/models";
import { CONFIG } from "@src/utils/config";

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Product],
  repositoryMode: true,
  logging: CONFIG.environment === "development" ? console.log : false,
});
