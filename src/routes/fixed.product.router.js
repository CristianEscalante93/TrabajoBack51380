const express= require("express");
const { Router } = require("express");
const router = Router();
//const ProductManager = require("../DAO/ProductManager.js");
const { ProductsModel } = require("../DAO/models/products.model.js");
//const productManager = new ProductManager("productsDB");
const ProductService = require("../services/products.service.js");
const productService = new ProductService;


router.get("/", async (req, res) => {
  try {
    const products = await productService.getAll(req.query);

    const { docs, ...rest } = products;
    const {limit, page, category, sort }= req.query
    let prod = docs.map((doc) => {
      return {
        title: doc.title,
        description: doc.description,
        price: doc.price,
        thumbnail: doc.thumbnail,
        code: doc.code,
        stock: doc.stock,
        category: doc.category,
        _id: doc._id
      };
    });
    let links = [];
  for (let i = 1; i < rest.totalPages + 1; i++) {

    links.push({ label: i, href: `http://localhost:8080/?category=${category}&limit=${limit}&page=` + i });
  }
    // const products = await productManager.getProducts();
    return res.render( "home", {products:prod, pagination: rest,links} );
  } catch (error) {
    res.status(500).json({ msg: "Error"});
  } 
});
router.get('/:pid', async (req, res) => {
  try {

    const pid = req.params.pid;
    const productQuery = await productService.getOneById(pid);
    console.log(productQuery)
    let product = {
      thumbnail: productQuery.thumbnail,
      title: productQuery.title,
      description: productQuery.description,
      price: productQuery.price,
      code: productQuery.code,
      stock: productQuery.stock,
      category: productQuery.category,
      _id: productQuery._id
      
    };
    return res.status(200).render('productDetail', { product });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
