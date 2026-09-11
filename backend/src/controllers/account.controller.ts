import type { Request, Response } from "express";
import * as accountService from "../services/account.service.js";
import {
  createAccountSchema,
  updateAccountSchema,
} from "../schemas/account.schema.js";

export function findAll(req: Request, res: Response) {
  const accounts = accountService.findAll();

  return res.status(200).json(accounts);
}

export function findById(req: Request, res: Response) {
  const { id } = req.params;

  const account = accountService.findById(Number(id));

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.status(200).json(account);
}

export function create(req: Request, res: Response) {
  const result = createAccountSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      return {
        field: issue.path[0],
        message: issue.message,
      };
    });

    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  try {
    const account = accountService.create(result.data);
    return res.status(201).json(account);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export function update(req: Request, res: Response) {
  const result = updateAccountSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.issues.map((issue) => {
      return {
        field: issue.path[0],
        message: issue.message,
      };
    });
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  const { id } = req.params;

  const account = accountService.update(Number(id), result.data);

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.status(200).json(account);
}
