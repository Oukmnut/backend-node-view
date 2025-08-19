const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Import routes
const productRoutes = require("../routes/productRoutes");
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Export app for Vercel serverless
module.exports = app;
