import type { Account } from "../types/account.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";
import { number } from "zod";
import { id } from "zod/locales";

const accounts: Account[] = [
  {
    id: 1,
    description: "Nubank",
    amount: 500.22,
    totalInstallments: 12,
    currentInstallment: 5,
    dueDate: "10/10/2026",
    paid: false,
  },
  {
    id: 2,
    description: "Energisa",
    amount: 348.5,
    totalInstallments: 1,
    currentInstallment: 1,
    dueDate: "10/10/2026",
    paid: false,
  },
];

export function findAll(): Account[] {
  return accounts;
}

export function findById(id: number): Account | undefined {
  return accounts.find((account) => account.id === id);
}

export function create(data: CreateAccount): Account {
  const newAccount: Account = {
    id: accounts.length + 1,
    ...data,
  };

  accounts.push(newAccount);

  return newAccount;
}

export function update(id: number, data: UpdateAccount): Account | undefined {
  const account = accounts.find((account) => account.id === id);

  if (!account) {
    return undefined;
  }

  Object.assign(account, data);

  return account;
}

export function deleteAccount(id: number): boolean {
  const index = accounts.findIndex((account) => account.id === id);

  if (index === -1) {
    return false;
  }

  accounts.splice(index, 1);
  
  return true;
}
