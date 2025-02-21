const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
