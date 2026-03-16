const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

async function connectWithRetry() {
  while (true) {
    try {
      pool = mysql.createPool(dbConfig);

      // test connection
      const conn = await pool.getConnection();
      conn.release();

      console.log("✅ MySQL Pool Connected");
      break;
    } catch (err) {
      console.error("❌ MySQL connection failed:", err.message);
      console.log("⏳ Retrying in 5 seconds...\n");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

function getPool() {
  return pool;
}

module.exports = { connectWithRetry, getPool };
