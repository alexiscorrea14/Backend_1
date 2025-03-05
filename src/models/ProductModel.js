import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

const ProductModel = mongoose.model('Product', productSchema);

export default ProductModel;
