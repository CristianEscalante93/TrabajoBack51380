const express= require("express");
const { Router } = require("express");
const routerReal = Router();
const ProductManager = require("../ProductManager.js");
const productManager = new ProductManager("productsDB");

routerReal.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    return res.render( "realTimeProducts", {products:products} );
  } catch (error) {
    res.status(500).json({ msg: "Error"});
  }
});


module.exports = routerReal;