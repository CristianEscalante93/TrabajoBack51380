const express= require("express");
const { Router } = require("express");
const routerReal = Router();
// const ProductManager = require("../DAO/ProductManager.js");
//const { ProductsModel } = require("../DAO/models/products.model.js");
//const ProductService = require("../services/products.service.js");
// const productManager = new ProductManager("productsDB");
//const productService = new ProductService;
const ProductsController = require ("../controllers/products.controller.js")
const productsController = new ProductsController

routerReal.get("/", productsController.getRealTimeProducts);

module.exports = routerReal;