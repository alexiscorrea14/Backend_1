import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});

const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
