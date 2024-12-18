import pool from "./src/config.js";

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos.");
    connection.release(); // Libera la conexión al pool
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error.message);
  }
}

testConnection();
