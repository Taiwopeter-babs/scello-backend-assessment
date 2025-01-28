import express, { Express } from "express";
import { CONFIG } from "@/utils/config";
import cors from "cors";
import bodyParser from "body-parser";

// VERSION ROUTES
import { v1Route } from "./v1/routes";

const { port, environment } = CONFIG;
const app: Express = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/v1", v1Route);

app.listen(port, () => {
  console.log(`[server]: Server is listening on port ${port}`);
});
