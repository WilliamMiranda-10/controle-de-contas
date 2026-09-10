import * as accountRepository from "../repositories/account.repositoy.js";
import type { CreateAccount, UpdateAccount } from "../schemas/account.schema.js";

export function findAll() {
  return accountRepository.findAll();
}

export function findById(id: number) {
  return accountRepository.findById(id);
}

export function create(data: CreateAccount) {
  return accountRepository.create(data);
}

export function update(id: number, data: UpdateAccount) {
  return accountRepository.update(id, data);
}
