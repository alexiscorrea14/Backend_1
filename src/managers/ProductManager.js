import fs from 'fs';
import path from 'path';

const productsFilePath = path.resolve('products.json');

export class ProductManager {
  static async getProducts() {
    const data = await fs.promises.readFile(productsFilePath, 'utf-8');
    return JSON.parse(data);
  }

  static async getProductById(pid) {
    const products = await ProductManager.getProducts();
    return products.find(product => product.id === pid);
  }

  static async addProduct(product) {
    const products = await ProductManager.getProducts();
    product.id = products.length + 1;
    products.push(product);
    await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    return product;
  }

  static async updateProduct(pid, updatedProduct) {
    const products = await ProductManager.getProducts();
    const index = products.findIndex(product => product.id === pid);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct };
      await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  }

  static async deleteProduct(pid) {
    const products = await ProductManager.getProducts();
    const index = products.findIndex(product => product.id === pid);
    if (index !== -1) {
      const [deletedProduct] = products.splice(index, 1);
      await fs.promises.writeFile(productsFilePath, JSON.stringify(products, null, 2));
      return deletedProduct;
    }
    return null;
  }
}
