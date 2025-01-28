import { CONFIG } from "@src/utils/config";
import swaggerJSDoc from "swagger-jsdoc";
import Product from "../products/product.swagger";

export const apiV1Options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.1.0",
    info: {
      title: "Scelloo E-Commerce V1 API Documentation",
      version: "1.0.0",
      description: "This is the API Documentation for Scelloo E-Commerce Backend Task",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Scelloo",
        url: "https://scelloo.com",
        email: "info@email.com",
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        // This defines reusable components
        schemas: {
          // Properties common to all the objects
          CommonParams: {
            type: "object",
            properties: {
              id: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },

          // Product
          ...Product,

          // Error objects
          Error: {
            type: "object",
            properties: {
              error: { type: "string" },
            },
          },
          ErrorArray: {
            type: "object",
            properties: {
              error: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    paths: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    servers: [
      {
        url: CONFIG.serverUrl,
      },
    ],
  },
  apis: ["./**/**/*route.ts"],
};
