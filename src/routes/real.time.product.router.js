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
    const products = await productService.getAll(req.query);
    const { docs, ...rest } = products;

    let prod = docs.map((doc) => {
      return {
        title: doc.title,
        description: doc.description,
        price: doc.price,
        thumbnail: doc.thumbnail,
        code: doc.code,
        stock: doc.stock,
        category: doc.category,
        _id: doc.id
      };
    });
    //const products = await productManager.getProducts();
    return res.render( "realTimeProducts", {products:prod,pagination: rest} );
  } catch (error) {
    res.status(500).json({ msg: "Error"});
  }
});


module.exports = routerReal;