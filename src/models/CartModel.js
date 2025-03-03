const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
    }
  ],
});

const CartModel = mongoose.model('Cart', cartSchema);

module.exports = CartModel;
