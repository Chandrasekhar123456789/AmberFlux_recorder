// backend/src/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Render provides this
  ssl: { rejectUnauthorized: false }          // required by Render Postgres
});

// Function to initialize database and table
export async function initDB() {
  try {
    // Create table if it does not exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS recordings (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL,
        size BIGINT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        storage_url TEXT,
        mime_type TEXT
      );
    `);
    console.log("✅ Database initialized and recordings table ready");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
}

export default pool;
