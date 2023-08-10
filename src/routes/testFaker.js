const {Faker, es, fakerES} =  require("@faker-js/faker");
const express= require("express");
const { Router } = require("express");
const testFaker = Router();
const ProductService = require('../DAO/mongo/services/products.service.js');
const productService = new ProductService;

const faker = new Faker({ locale: [es] });


function generateProduct() {
  const productStatus = faker.helpers.arrayElement(['true', 'false']);
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: fakerES.commerce.productDescription(),
    price: faker.commerce.price(),
    thumbnail: faker.internet.avatar(),
    code: faker.string.alphanumeric(5),
    stock: faker.string.numeric(1),
    category: faker.commerce.department(),
    status: productStatus,
  };
}

testFaker.get('/',(req,res)=>{

  const products = [];

  for (let i = 0; i < 50; i++) {
    products.push(generateProduct());
  }

  return res.send({
    status: 'success',
    payload: products,
  });
} );

testFaker.post('/', (req, res) => {
  const products = [];

  const product = req.body;
  const { title, description, price, thumbnail, code, stock, category, status } = product;
  productService.validateProduct(title, description, price, thumbnail, code, stock, category, status);

  products.push(product);

  return res.send({
    status: 'success',
    payload: product,
  });
});


module.exports = testFaker;