import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize DB + table
initDB();

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/recordings", async (req, res) => {
  try {
    const result = await req.app.locals.db.query("SELECT * FROM recordings ORDER BY createdAt DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recordings" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


