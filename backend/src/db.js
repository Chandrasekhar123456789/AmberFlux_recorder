// backend/src/db.js
import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function initDB() {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected");

    // Ensure recordings table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS recordings (
        id SERIAL PRIMARY KEY,
        filename TEXT NOT NULL,
        size BIGINT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ Table 'recordings' is ready");
    client.release();
  } catch (err) {
    console.error("❌ Error initializing database:", err.message);
  }
}

export { pool };

