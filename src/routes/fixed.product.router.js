const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductsController = require ("../controllers/products.controller.js")
const productsController = new ProductsController


router.get("/", productsController.getAll);
router.get('/:pid', productsController.getDetail);

module.exports = router;
