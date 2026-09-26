import { type Request, type Response } from "express";
import * as accountService from "../services/account.service.js";
import type {
  AccountIdParams,
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";

export async function findAll(_req: Request, res: Response) {
  const accounts = await accountService.findAll();

  return res.status(200).json(accounts);
}

export async function findById(req: Request<AccountIdParams>, res: Response) {
  const { id } = req.params;

  const account = await accountService.findById(Number(id));

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.status(200).json(account);
}

export async function create(
  req: Request<{}, {}, CreateAccount>,
  res: Response
) {
  const account = await accountService.create(req.body);
  return res.status(201).json(account);
}

export async function update(
  req: Request<AccountIdParams, {}, UpdateAccount>,
  res: Response
) {
  const { id } = req.params;

  const account = await accountService.update(Number(id), req.body);

  if (!account) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.status(200).json(account);
}

export async function deleteAccount(
  req: Request<AccountIdParams>,
  res: Response
) {
  const { id } = req.params;

  const deleted = await accountService.deleteAccount(Number(id));

  if (!deleted) {
    return res.status(404).json({
      message: "Account not found",
    });
  }

  return res.status(200).json({
    message: "Account deleted successfully",
  });
}
