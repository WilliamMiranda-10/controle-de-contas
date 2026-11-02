import Header from "./components/Header.tsx";
import type { Account, CreateAccount } from "./types/account.ts";
import { useState, useEffect } from "react";
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
    setDescription("");
    setAmount(0);
    setTotalInstallments(1);
    setCurrentInstallment(0);
    setDueDate("");
  }

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [currentInstallment, setCurrentInstallment] = useState(0);
  const [dueDate, setDueDate] = useState("");

  async function fetchAccounts() {
    const response = await fetch("http://localhost:3000/accounts");
    const data = await response.json();
   
    setAccounts(data);
  }

  useEffect(() => {
    fetchAccounts();
  }, []);

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
              required
            />
          </div>
          <div>
            <input
              type="number"
              min={0.0}
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              placeholder="Valor da parcela"
              required
            />
          </div>
          <div>
            <input
              type="number"
              min={1}
              step={1}
              value={totalInstallments}
              onChange={(event) =>
                setTotalInstallments(Number(event.target.value))
              }
              placeholder="Total de parcelas"
              required
            />
          </div>
          <div>
            <input
              type="number"
              step={1}
              max={12}
              value={currentInstallment}
              onChange={(event) =>
                setCurrentInstallment(Number(event.target.value))
              }
              placeholder="parcela atual"
              required
            />
          </div>
          <div>
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit">Cadastrar conta</button>
      </form>
    </main>
  );
}
export default App;
