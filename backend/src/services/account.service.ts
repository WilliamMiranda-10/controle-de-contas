import * as accountRepository from "../repositories/account.repositoy.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";

export function findAll() {
  return accountRepository.findAll();
}

export function findById(id: number) {
  return accountRepository.findById(id);
}

export function create(data: CreateAccount) {
  if (data.currentInstallment > data.totalInstallments) {
    throw new Error(
      "A parcela atual não pode ser maior que a quantidade total de parcelas"
    );
  }

  return accountRepository.create(data);
}

export function update(id: number, data: UpdateAccount) {
  const account = accountRepository.findById(id);

  if (!account) {
    return undefined;
  }

  const currentInstallment =
    data.currentInstallment ?? account.currentInstallment;
  const totalInstallments = data.totalInstallments ?? account.totalInstallments;

  console.log("current", currentInstallment);
  console.log("total", totalInstallments);

  if (currentInstallment > totalInstallments) {
    throw new Error(
      "A parcela atual não pode ser maior que a quantidade total de parcelas"
    );
  }

  return accountRepository.update(id, data);
}

export function deleteAccount(id: number) {
  return accountRepository.deleteAccount(id);
}
