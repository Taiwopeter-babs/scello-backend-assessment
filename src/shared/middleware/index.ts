import { NextFunction, Request, Response } from "express";

export function validateIdParameter(request: Request, response: Response, next: NextFunction) {
  const { id } = request.params;

  const checkDigit = /^[0-9]+$/;

  if (!checkDigit.test(id)) {
    response.status(400).json({ error: "Id parameter is not valid" });
    return;
  }

  next();
}
