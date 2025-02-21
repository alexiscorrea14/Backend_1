import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  quantity: Number,
});

const CartModel = mongoose.model('Cart', cartSchema);

export default CartModel;
