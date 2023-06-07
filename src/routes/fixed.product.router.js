const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductManager = require("../DAO/ProductManager.js");
const { ProductsModel } = require("../DAO/models/products.model.js");
const productManager = new ProductManager("productsDB");



router.get("/", async (req, res) => {
  try {
    let products = await ProductsModel.find({})
    // const products = await productManager.getProducts();
    return res.render( "home", {products:products} );
  } catch (error) {
    res.status(500).json({ msg: "Error"});
  } 
});

module.exports = router;
