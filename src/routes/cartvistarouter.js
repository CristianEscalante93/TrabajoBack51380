const express= require("express");
const { Router } = require("express");
const router = Router();
// const ProductManager= require("../DAO/ProductManager.js");
// const productManager = new ProductManager();
const CartManager= require("../cartsManager.js");
const CartService = require("../services/carts.service.js");
// const cartManager = new CartManager();

const cartservice= new CartService

router.get("/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await cartservice.getCartById(cid);

    const simplifiedCart = cart.products.map((item) => {
      return {
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category,
        code:item.product.code,
        thumbnail: item.product.thumbnail,
        stock: item.product.stock,
        description: item.product.description
      };
    });
    console.log(cart)
    res.render("cart", { cart: simplifiedCart });
  } catch (error) {
    next(error);
  }
});



module.exports = router;