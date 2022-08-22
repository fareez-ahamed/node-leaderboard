import { NextFunction, Request, Response } from "express";
import { InvalidConfigurationError, InvalidCredentialsError } from "./errors";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined || !authHeader.startsWith("Bearer")) {
    next(new InvalidCredentialsError());
    return;
  }
  const token = authHeader.substring(7);
  req.store.validateToken(token);
  next();
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof InvalidCredentialsError) {
    res.status(401).send({ message: "Invalid Credentials" });
  } else if (err instanceof InvalidConfigurationError) {
    res.status(500).send({ message: "Invalid Configuration" });
  } else {
    res.status(500).send({ message: err.message });
  }
}
