import Header from "./components/Header.tsx";
import type { Account } from "./types/account.ts";
import { useState } from "react";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const newAccount: Account = {
    id: 1,
    description: "Internet",
    amount: 100,
    totalInstallments: 10,
    currentInstallment: 1,
    dueDate: "2026-11-15",
    paid: false,
  };

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <main>
      <Header
        title="Controle de Contas"
        subtitle="Gerencie suas contas de forma simples."
      />
      <button onClick={() => setAccounts([...accounts, newAccount])}>
        adicionar
      </button>

      {accounts.map((account) => (
        <div key={account.id}>
          <hr />
          <p> {account.description}</p>
          <p>{currencyFormatter.format(account.amount)}</p>
          <p>{`Parcela ${account.currentInstallment} de ${account.totalInstallments}`}</p>
          <p>{account.dueDate}</p>
          <p>{account.paid ? "Paga" : "Pendente"}</p>
          <hr />
        </div>
      ))}
    </main>
  );
}
export default App;
