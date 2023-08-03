const { ProductsModel } = require('../models/products.model.js');
const {paginate} = require('mongoose-paginate-v2')
class ProductService {
  validateProduct(title, description, price, thumbnail, code, stock, category, status) {
    if (!title || !description || !price || !thumbnail || !code || !stock || !category || !status) {
      console.log('Validation error: please complete all fields');
      throw new Error('Validation error: please complete all fields');
    }
  }

  async getAll(req) {
    try {
      const {limit, page, category, sort }= req
      
      const queryCategory = category ? { category: category } : {};
      
      let querySort = {};
      if (sort == 'asc') {
        querySort = { price: 1 };
      } else if (sort == 'desc') {
        querySort = { price: -1 };
      } else {
        querySort = {};
      }
      const products = await ProductsModel.paginate(queryCategory, { limit: limit || 2, page: page || 1,sort: querySort});
      
    products.prevLink = products.prevPage ? `/api/products?category=${category}&limit=${limit}&page=${products.prevPage}` : null;
    products.nextLink = products.nextPage ? `/api/products?category=${category}&limit=${limit}&page=${products.nextPage}` : null;
    return products;
    } catch (error) {
      return [];
    }
  }

  async getOneById(id) {
    const product = await ProductsModel.findOne({ _id:id});
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