const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// API routes
const productRoutes = require("../../routes/productRoutes");
app.use("/api/products", productRoutes);

// Root route
app.get("/", (req, res) => res.send("✅ Backend API running"));

module.exports = app;
