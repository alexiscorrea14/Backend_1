export default class CartDTO {
    constructor(cart) {
      this.id = cart._id;
      this.user = cart.user;
      this.products = cart.products.map(item => ({
        product: item.product,
        quantity: item.quantity
      }));
    }
  }
  