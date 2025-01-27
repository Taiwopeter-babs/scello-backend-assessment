import express, { Express } from "express";
import { CONFIG } from "@/utils/config";
import cors from "cors";
import bodyParser from "body-parser";

// VERSION ROUTES
import { v1Route } from "./v1/routes";

const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

const { port, environment } = CONFIG;
console.log("port", port, "environment", environment);

app.use("/api/v1", v1Route);

app.listen(port, () => {
  console.log(`[server]: Server is on port ${port}`);
});
