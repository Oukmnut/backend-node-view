const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // allow PUT/DELETE in forms

// View engine
app.set('view engine', 'ejs');
app.set('views', './views');

// API routes
app.use('/api/products', productRoutes);

// Web view routes
const Product = require('./models/Product');

app.get('/', async (req, res) => {
  const products = await Product.find();
  res.render('products/index', { products });
});

app.get('/products/create', (req, res) => {
  res.render('products/create');
});

app.post('/products', async (req, res) => {
  await Product.create(req.body);
  res.redirect('/');
});

app.get('/products/:id/edit', async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('products/edit', { product });
});

app.put('/products/:id', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/');
});

app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
  })
  .catch(err => console.error(err));
