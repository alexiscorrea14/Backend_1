import fs from 'fs';
import path from 'path';

const cartsFilePath = path.resolve('carts.json');
const productsFilePath = path.resolve('products.json');

export class CartManager {
  static async getCarts() {
    const data = await fs.promises.readFile(cartsFilePath, 'utf-8');
    return JSON.parse(data);
  }

  static async addCart(cart) {
    const carts = await CartManager.getCarts();
    cart.id = carts.length + 1;
    carts.push(cart);
    await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  static async getCartById(cid) {
    const carts = await CartManager.getCarts();
    return carts.find(cart => cart.id === cid);
  }

  static async addProductToCart(cid, pid) {
    const carts = await CartManager.getCarts();
    const cart = carts.find(cart => cart.id === cid);
    if (!cart) return null;

    const products = await fs.promises.readFile(productsFilePath, 'utf-8');
    const product = JSON.parse(products).find(p => p.id === pid);
    if (!product) return null;

    cart.products.push(product);
    await fs.promises.writeFile(cartsFilePath, JSON.stringify(carts, null, 2));
    return cart;
  }
}
