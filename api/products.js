const mongoose = require('mongoose');
const Product = require('../models/Product');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

// serverless function handler
module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    const products = await Product.find();
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  }

  res.status(405).json({ message: 'Method not allowed' });
};
