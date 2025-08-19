const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("../../routes/productRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// API routes
app.use("/api/products", productRoutes);

// Root API route
app.get("/", (req, res) => {
  res.json({ message: "✅ Backend API running" });
});

module.exports = app;
