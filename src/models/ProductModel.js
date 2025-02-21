import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
