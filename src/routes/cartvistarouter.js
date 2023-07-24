const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
//const CartManager= require("../cartsManager.js");
const CartsController = require ("../controllers/carts.controller.js")
const cartsController = new CartsController

router.get("/:cid", cartsController.cartIdVista);

module.exports = router;