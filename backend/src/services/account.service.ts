import * as accountRepository from "../repositories/account.repositoy.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";

export async function findAll() {
  return await accountRepository.findAll();
}

export async function findById(id: number) {
  return await accountRepository.findById(id);
}

export async function create(data: CreateAccount) {
  if (data.currentInstallment > data.totalInstallments) {
    throw new Error(
      "A parcela atual não pode ser maior que a quantidade total de parcelas"
    );
  }

  
  return await accountRepository.create(data);
}

export async function update(id: number, data: UpdateAccount) {

  const account = await accountRepository.findById(id);

  if (!account) {
    return undefined;
  }

  const currentInstallment = data.currentInstallment ?? account.currentInstallment;
  const totalInstallments = data.totalInstallments ?? account.totalInstallments;

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
