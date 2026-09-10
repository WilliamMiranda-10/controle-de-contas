import express from "express";
import accountRoutes from "./routes/account.routes.js";

const app = express();
app.use(express.json());
app.use("/accounts", accountRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
