import express from "express";
import cors from "cors";
import accountRoutes from "./routes/account.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.use("/accounts", accountRoutes);
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
