import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export function validate(schema: ZodType, target: "body" | "params") {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        return {
          field: issue.path[0],
          message: issue.message,
        };
      });
      res.status(400).json({
        message: "Validation error",
        errors,
      });
      return;
    }

    if (target === "body") {
      req[target] = result.data;
    }

    next();
  };
}
