export interface Account {
  id: number;
  description: string;
  amount: number;
  totalInstallments: number;
  currentInstallment: number;
  dueDate: string;
  paid: boolean;
}

export type CreateAccount = Omit<Account, "id" | "paid">;
