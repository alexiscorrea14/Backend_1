import ProductModel from "../models/productModel.js";

class ProductRepository {
  async getAll() {
    return await ProductModel.find();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async create(productData) {
    return await ProductModel.create(productData);
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}

export default new ProductRepository();
