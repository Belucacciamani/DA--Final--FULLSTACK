import { config } from "dotenv";
import { createPool } from "mysql2/promise";

config();

//conexión con DB

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});




export default pool;
