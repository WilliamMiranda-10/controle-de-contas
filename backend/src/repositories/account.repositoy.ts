import type { Account } from "../types/account.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";
import pool from "../../config/database.js";

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

export async function findAll(): Promise<Account[]> {
  const result = await pool.query("SELECT * FROM accounts");
  return result.rows;
}

export async function findById(id: number): Promise<Account | undefined> {
  const result = await pool.query("SELECT * FROM accounts WHERE id = $1", [id]);
  return result.rows[0];
}

export async function create(data: CreateAccount): Promise<Account> {
  const result = await pool.query(
    "INSERT INTO accounts (description, amount, total_installments, current_installment, due_date, paid) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      data.description,
      data.amount,
      data.totalInstallments,
      data.currentInstallment,
      data.dueDate,
      data.paid,
    ]
  );

  return result.rows[0];
}

export async function update(
  id: number,
  data: UpdateAccount
): Promise<Account | undefined> {
  const fields: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    const columnMap: Record<string, string> = {
      description: "description",
      amount: "amount",
      totalInstallments: "total_installments",
      currentInstallment: "current_installment",
      dueDate: "due_date",
      paid: "paid",
    };

    const column = columnMap[key];

    if (!column) {
      continue;
    }

    fields.push(`${column} = $${values.length + 1}`);
    values.push(value);
  }

  if (fields.length === 0) {
    return undefined;
  }

  values.push(id);

  const result = await pool.query(
    `UPDATE accounts SET ${fields.join(", ")} WHERE id = $${
      values.length
    } RETURNING *`,
    values
  );

  return result.rows[0];
}

export function deleteAccount(id: number): boolean {
  const index = accounts.findIndex((account) => account.id === id);

  if (index === -1) {
    return false;
  }

  accounts.splice(index, 1);

  return true;
}
