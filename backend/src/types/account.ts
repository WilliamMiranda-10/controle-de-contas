export interface Account {
  id: number;
  description: string; // decrição
  amount: number; // valor da parcela
  totalInstallments: number; // quantidade de parcela
  currentInstallment: number; // parcela atual
  dueDate: string; //  vencimento
  paid: boolean; // se foi pago ou nao
}

