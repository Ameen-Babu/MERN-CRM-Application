const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load .env FIRST
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({ message: "CRM API running ✅" });
});

// ROUTES - CRITICAL (must be after middleware)
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
