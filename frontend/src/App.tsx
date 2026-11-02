import Header from "./components/Header.tsx";
import type { Account, CreateAccount } from "./types/account.ts";
import { useState } from "react";
import type { SyntheticEvent } from "react";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function togglePayment(id: number) {
    setAccounts(
      accounts.map((account) =>
        account.id === id ? { ...account, paid: !account.paid } : account
      )
    );
  }

  function addAccount(data: CreateAccount) {
    const newAccount: Account = {
      id: Date.now(),
      ...data,
      paid: false,
    };

    setAccounts((currentAccounts) => [...currentAccounts, newAccount]);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const data: CreateAccount = {
      description,
      amount,
      totalInstallments,
      currentInstallment,
      dueDate,
    };

    addAccount(data);
  }

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [currentInstallment, setCurrentInstallment] = useState(0);
  const [dueDate, setDueDate] = useState("");

  return (
    <main>
      <Header
        title="Controle de Contas"
        subtitle="Gerencie suas contas de forma simples."
      />

      {accounts.map((account) => (
        <div key={account.id}>
          <hr />
          <p> {account.description}</p>
          <p>{currencyFormatter.format(account.amount)}</p>
          <p>{`Parcela ${account.currentInstallment} de ${account.totalInstallments}`}</p>
          <p>{account.dueDate}</p>
          <p>{account.paid ? "Paga" : "Pendente"}</p>

          <button onClick={() => togglePayment(account.id)}>
            {account.paid ? "Desfazer pagamento" : "Marcar como paga"}
          </button>

          <hr />
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Descrição da conta"
            />
          </div>
          <div>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="Valor da parcela"
            />
          </div>
          <div>
            <input
              type="number"
              value={totalInstallments}
              onChange={(event) =>
                setTotalInstallments(Number(event.target.value))
              }
              placeholder="Total de parcelas"
            />
          </div>
          <div>
            <input
              type="number"
              step={1}
              value={currentInstallment}
              onChange={(event) =>
                setCurrentInstallment(Number(event.target.value))
              }
              placeholder="parcela atual"
            />
          </div>
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>
        </div>

        <button type="submit">Cadastrar conta</button>
      </form>
    </main>
  );
}
export default App;
