import { NextFunction, Request, Response } from "express";
import { createUserSchema, updateUserSchema } from "./user.validator";

export function validateUserBody(request: Request, response: Response, next: NextFunction) {
  const body = request.body;

  let errorMessages: Array<Record<string, string> | string> = [];

  const { data: _, error: zodError } = createUserSchema.safeParse(body);

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

export function validateUserUpdateBody(request: Request, response: Response, next: NextFunction) {
  const body = request.body;

  let errorMessages: Array<Record<string, string> | string> = [];

  const { data: _, error: zodError } = updateUserSchema.safeParse(body);

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
