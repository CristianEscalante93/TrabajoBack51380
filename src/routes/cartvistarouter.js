const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
//const CartManager= require("../cartsManager.js");
const CartsController = require ("../controllers/carts.controller.js")
const cartsController = new CartsController
const TicketsController = require ("../controllers/ticketController.js");
const { isUser } = require("../middlewares/auth.js");
const ticketsController = new TicketsController


router.get("/:cid", cartsController.cartIdVista);
router.get("/:cid/purchase", isUser,ticketsController.checkOut);
router.get("/:cid/purchase/ticket", isUser, ticketsController.addTicket);


module.exports = router;