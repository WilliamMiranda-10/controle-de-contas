import { AppError } from "../errors/appError.js";
import * as accountRepository from "../repositories/account.repositoy.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";

function validateInstallments(
  currentInstallment: number,
  totalInstallments: number
): void {
  if (currentInstallment > totalInstallments) {
    throw new AppError(
      "A parcela atual não pode ser maior que a quantidade total de parcelas",
      400
    );
  }
}

export function findAll() {
  return accountRepository.findAll();
}

export function findById(id: number) {
  return accountRepository.findById(id);
}

export function create(data: CreateAccount) {
  validateInstallments(data.currentInstallment, data.totalInstallments);

  return accountRepository.create(data);
}

export async function update(id: number, data: UpdateAccount) {
  const account = await accountRepository.findById(id);

  if (!account) {
    return undefined;
  }

  const currentInstallment =
    data.currentInstallment ?? account.currentInstallment;
  const totalInstallments = data.totalInstallments ?? account.totalInstallments;

  validateInstallments(currentInstallment, totalInstallments);

  return await accountRepository.update(id, data);
}

export function deleteAccount(id: number) {
  return accountRepository.deleteAccount(id);
}
