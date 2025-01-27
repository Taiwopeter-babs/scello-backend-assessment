import express, { Express, Request, Response } from "express";
import { CONFIG } from "@utils/config";

const app: Express = express();

const { port, environment } = CONFIG;
console.log("port", port, "environment", environment);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is on port ${port}`);
});
