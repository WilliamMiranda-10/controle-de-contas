import Header from "./components/Header.tsx";
import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <Header
        title="Controle de Contas"
        subtitle="Gerencie suas contas de forma simples."
      />
      <button onClick={()=>setCount((count)=> count + 1)}>contar</button>
      <h2>{count}</h2>
    </main>
  );
}
export default App;
