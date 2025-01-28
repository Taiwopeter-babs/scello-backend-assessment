import "dotenv/config";

export const CONFIG = {
  port: process.env.PORT || 4000,
  environment: process.env.NODE_ENV || "development",
  serverUrl: process.env.SERVER_URL || "http://localhost:5000",
};
