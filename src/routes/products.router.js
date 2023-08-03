const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
//const {ProductsModel} = require("../DAO/models/products.model.js");
// const ProductService = require("../services/products.service.js");
// const productService = new ProductService;
const ProductsController = require ("../controllers/products.controller.js");
const { isAdmin } = require("../middlewares/auth.js");
const productsController = new ProductsController

router.get('/', productsController.getAllApi);

router.get('/:id', productsController.getIdApi);

router.post("/", isAdmin,productsController.postApi);

router.put("/:id", isAdmin,productsController.updateApi);

router.delete("/:id", isAdmin,productsController.deleteApi);

module.exports = router;