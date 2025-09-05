// backend/src/index.js
import express from "express";
import cors from "cors";
import { initDB, pool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Initialize DB at startup
initDB();

// --- Health check ---
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      status: "ok ✅",
      dbTime: result.rows[0].now,
    });
  } catch (err) {
    console.error("❌ Health check failed:", err.message);
    res.status(500).json({
      status: "error ❌",
      message: err.message,
    });
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("🎉 Screen Recorder Backend is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
