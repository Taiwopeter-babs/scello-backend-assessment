import { NextFunction, Request, Response } from "express";
import { createProductSchema, updateProductSchema } from "./product.validator";

export function validateProductBody(request: Request, response: Response, next: NextFunction) {
  const body = request.body;

  let errorMessages: Array<Record<string, string> | string> = [];

  const { data: _, error: zodError } = createProductSchema.safeParse(body);

  if (zodError) {
    for (const issue of zodError.issues) {
      const entry = [[issue.path[0].toString(), issue.message]];

      errorMessages.push(Object.fromEntries(entry));
    }

    response.status(400).json({ error: errorMessages });
    return;
  }

  next();
}

export function validateProductUpdateBody(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const body = request.body;

  let errorMessages: Array<Record<string, string> | string> = [];

  const { data: _, error: zodError } = updateProductSchema.safeParse(body);

  if (zodError) {
    for (const issue of zodError.issues) {
      const entry = [[issue.path[0].toString(), issue.message]];

      errorMessages.push(Object.fromEntries(entry));
    }

    response.status(400).json({ error: errorMessages });
    return;
  }

  next();
}
