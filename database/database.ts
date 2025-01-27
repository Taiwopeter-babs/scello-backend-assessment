import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

import { Product } from "@/models";

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  models: [Product],
  repositoryMode: true,
});
