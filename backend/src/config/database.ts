import { Pool, types } from "pg";
import "dotenv/config";

types.setTypeParser(1082, (value) => value);

const requiredEnvVariables = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];

for (const item of requiredEnvVariables) {
  if (!process.env[item]) {
    throw new Error(`${item} não foi definido!`);
  }
}

const port = Number(process.env.DB_PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("DB_PORT deve ser número inteiro entre 1 e 65535");
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: port,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
