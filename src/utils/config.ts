import "dotenv/config";

export const CONFIG = {
  port: process.env.PORT || 4000,
  environment: process.env.NODE_ENV || "development",
};

// "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json",
//  "exec": "concurrently \"npx tsc --watch\" \"ts-node -r tsconfig-paths/register src/app.ts\"",
