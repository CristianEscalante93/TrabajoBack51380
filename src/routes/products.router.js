const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
//const {ProductsModel} = require("../DAO/models/products.model.js");
// const ProductService = require("../services/products.service.js");
// const productService = new ProductService;
const ProductsController = require ("../controllers/products.controller.js")
const productsController = new ProductsController

router.get('/', productsController.getAllApi);

router.get('/:id', productsController.getIdApi);

router.post("/", productsController.postApi);

router.put("/:id", productsController.updateApi);

router.delete("/:id", productsController.deleteApi);

module.exports = router;