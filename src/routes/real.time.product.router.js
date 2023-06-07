const express= require("express");
const { Router } = require("express");
const routerReal = Router();
// const ProductManager = require("../DAO/ProductManager.js");
const { ProductsModel } = require("../DAO/models/products.model.js");
const ProductService = require("../services/products.service.js");

// const productManager = new ProductManager("productsDB");
const productService = new ProductService;

routerReal.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    //const products = await productManager.getProducts();
    return res.render( "realTimeProducts", {products:products} );
  } catch (error) {
    res.status(500).json({ msg: "Error"});
  }
});


module.exports = routerReal;