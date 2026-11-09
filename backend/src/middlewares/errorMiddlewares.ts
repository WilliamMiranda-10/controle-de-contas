import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError.js";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error)
  return res.status(500).json({
    message: "Internal server error",
  });
}
