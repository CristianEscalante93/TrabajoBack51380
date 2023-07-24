const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
// const CartManager= require("../cartsManager.js");
// const cartManager = new CartManager();
// const CartService = require("../services/carts.service.js");
// const cartservice= new CartService
const CartsController = require ("../controllers/carts.controller.js")
const cartsController = new CartsController

router.get('/', cartsController.getCartApi);
router.post("/", cartsController.postCartApi);
router.get("/:idCart/products", cartsController.getIdCartApi);
router.post("/:idCart/products/:idProduct", cartsController.postProductInCart);
router.delete('/:cid/products/:pid', cartsController.deleteProductInCart);
router.delete('/:cid', cartsController.deleteCart);
router.put("/:cid", cartsController.updateCart);
router.put("/:cid/products/:pid", cartsController.updateProductIncart);

module.exports = router;