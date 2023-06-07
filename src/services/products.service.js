const { ProductsModel } = require('../DAO/models/products.model.js');

class ProductService {
  validateProduct(title, description, price, thumbnail, code, stock, category, status) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
      console.log('Validation error: please complete all fields');
      throw new Error('Validation error: please complete all fields');
    }
  }

  async getAll() {
    try {
      const products = await ProductsModel.find({}).lean();
    return products;
    } catch (error) {
      return []
    }
  }

  async getOneById(id) {
    const product = await ProductsModel.findOne({ _id: id });
    return product;
  }

  async createOne(title, description, price, thumbnail, code, stock, category, status) {
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status);
    const productCreated = await ProductsModel.create({ title, description, price, thumbnail, code, stock, category, status });
    return productCreated;
  }

  async deleteOne(id) {
    const deleted = await ProductsModel.deleteOne({ _id: id });
    return deleted;
  }

  async updateOne(id, title, description, price, thumbnail, code, stock, category, status) {
    if (!id) throw new Error('Invalid _id');
    this.validateProduct(title, description, price, thumbnail, code, stock, category, status);
    const productUptaded = await ProductsModel.updateOne({ _id: id }, { title, description, price, thumbnail, code, stock, category, status });
    return productUptaded;
  }
}
module.exports = ProductService;