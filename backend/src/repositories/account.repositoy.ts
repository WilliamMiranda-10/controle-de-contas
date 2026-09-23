import type { Account, AccountRow } from "../types/account.js";
import type {
  CreateAccount,
  UpdateAccount,
} from "../schemas/account.schema.js";
import pool from "../../config/database.js";

export function mapRowToAccount(row: AccountRow): Account {
  return {
    id: row.id,
    description: row.description,
    amount: Number(row.amount),
    totalInstallments: row.total_installments,
    currentInstallment: row.current_installment,
    dueDate: row.due_date,
    paid: row.paid,
  };
}

export async function findAll(): Promise<Account[]> {
  const result = await pool.query<AccountRow>("SELECT * FROM accounts");

  return result.rows.map((row) => mapRowToAccount(row));
}

export async function findById(id: number): Promise<Account | undefined> {
  const result = await pool.query<AccountRow>(
    "SELECT * FROM accounts WHERE id = $1",
    [id]
  );
  const row = result.rows[0];

  if (!row) {
    return undefined;
  }

  return mapRowToAccount(row);
}

export async function create(data: CreateAccount): Promise<Account> {
  const result = await pool.query<AccountRow>(
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
  const row = result.rows[0];

  if (!row) {
    throw new Error("Failed to create account");
  }

  return mapRowToAccount(row);
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

  const result = await pool.query<AccountRow>(
    `UPDATE accounts SET ${fields.join(", ")} WHERE id = $${
      values.length
    } RETURNING *`,
    values
  );

  const row = result.rows[0];

  if (!row) {
    return undefined;
  }

  return mapRowToAccount(row);
}

export async function deleteAccount(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM accounts WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return false;
  }
  return true;
}
