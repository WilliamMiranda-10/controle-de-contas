import Header from "./components/Header.tsx";
import type { Account, CreateAccount, UpdateAccount } from "./types/account.ts";
import { useState, useEffect } from "react";
import type { SyntheticEvent } from "react";
import "./App.css";

function App() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const [editingAccountId, setEditingAccountId] = useState<number | null>(null);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [totalInstallments, setTotalInstallments] = useState(1);
  const [currentInstallment, setCurrentInstallment] = useState(0);
  const [dueDate, setDueDate] = useState("");

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function togglePayment(id: number) {
    try {
      const account = accounts.find((item) => item.id === id);

      if (!account) {
        throw new Error("Conta não encontrada.");
      }

      const response = await fetch(`http://localhost:3000/accounts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paid: !account.paid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Não foi possível atualizar a conta."
        );
      }

      const updateAccount: Account = await response.json();

      setAccounts((currentAccounts) =>
        currentAccounts.map((item) =>
          item.id === updateAccount.id ? updateAccount : item
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar pagamento:", error);
    }
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      if (editingAccountId !== null) {
        await updateAccount();
        return;
      }
      
      const data: CreateAccount = {
        description,
        amount,
        totalInstallments,
        currentInstallment,
        dueDate,
        paid: false,
      };

      const response = await fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error");
      }

      const result = await response.json();

      setAccounts((currentAccounts) => [...currentAccounts, result]);

      setDescription("");
      setAmount(0);
      setTotalInstallments(1);
      setCurrentInstallment(0);
      setDueDate("");
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEdit(id: number) {
    const account = accounts.find((item) => item.id === id);

    if (!account) {
      throw new Error("Conta não encontrada.");
    }

    setEditingAccountId(id);

    setDescription(account.description);
    setAmount(account.amount);
    setTotalInstallments(account.totalInstallments);
    setCurrentInstallment(account.currentInstallment);
    setDueDate(account.dueDate);
  }

  async function updateAccount() {
    try {
      if (editingAccountId === null) {
        return;
      }

      const data: UpdateAccount = {
        description,
        amount,
        totalInstallments,
        currentInstallment,
        dueDate,
      };

      const response = await fetch(
        `http://localhost:3000/accounts/${editingAccountId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Não foi possivel editar a conta."
        );
      }

      const account = await response.json();

      setAccounts((currentAccounts) =>
        currentAccounts.map((item) => (item.id === account.id ? account : item))
      );

      setEditingAccountId(null);

      setDescription("");
      setAmount(0);
      setTotalInstallments(1);
      setCurrentInstallment(0);
      setDueDate("");
    } catch (error) {
      console.error("Erro ao editar conta:", error);
    }
  }

  async function deleteAccount(id: number) {
    try {
      const response = await fetch(`http://localhost:3000/accounts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Não foi possivel deletar a conta."
        );
      }

      setAccounts((currentAccounts) =>
        currentAccounts.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
    }
  }

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
          <div>
            <button onClick={() => handleEdit(account.id)}>Editar</button>
          </div>
          <div>
            <button onClick={() => deleteAccount(account.id)}>Excluir</button>
          </div>

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
        <div>
          <button type="submit">Cadastrar conta</button>
        </div>
      </form>
    </main>
  );
}
export default App;
