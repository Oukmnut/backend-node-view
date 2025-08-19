const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Routes
const productRoutes = require("./routes/productRoutes");
app.use("/products", productRoutes);

// CRUD view routes
app.get("/", (req, res) => res.render("index"));
app.get("/create", (req, res) => res.render("create"));
app.get("/edit/:id", (req, res) => res.render("edit"));

// Start server locally
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
