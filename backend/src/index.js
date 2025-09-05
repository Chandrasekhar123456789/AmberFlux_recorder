// backend/src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// recordings routes placeholder
app.get("/api/recordings", (req, res) => {
  res.json([]);
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

