const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductManager= require("../DAO/ProductManager.js");
const productManager = new ProductManager();
const {ProductsModel} = require("../DAO/models/products.model.js");
const ProductService = require("../services/products.service.js");


const productService = new ProductService;

router.get('/', async (req,res)=>{
  try {
    //const limit= req.query.limit;
  // const products= await productManager.getProducts();
  const products = await productService.getAll(req.query);

  // if(limit){
  //   res.status(200).json({
  //     status: "success",
  //     msg: "Lista de productos limitada",
  //     payload: products,
  //   })
  // }else{
    res.status(200).json({
      status: "success",
      msg: "Lista de productos",
      payload: products,
    });
  //}
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});

router.get('/:id',async (req,res)=>{
  try {

    const {id}= req.params;
    console.log(id)
  // const product = await productManager.getProductById(parseInt(id));
  const product = await productService.getOneById(id);
  
  if(product){
    res.status(200).json(product);
  }else{
    res.status(404).json({error: 'Product not found'});
  }
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
})

router.post("/", async (req, res) => {
  try {
    //const addProduct = await productManager.addProduct(newProduct);
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;
  const addProduct = await productService.createOne( title, description, price, thumbnail, code, stock, category, status );
    res.status(201).json({
    status: "success",
    msg: "Producto creado",
    data: addProduct,
  }); 
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
  
});

router.put("/:id", async (req, res) => {
  try {
    //const newProduct = req.body;
    //const modifiedProduct = await productManager.updateproduct(id,newProduct);
    const {id}= req.params;
    const { title, description, price, thumbnail, code, stock, category, status } = req.body;
    const modifiedProduct = await productService.updateOne(id,title, description, price, thumbnail, code, stock, category, status );
    return res.status(201).json({
    status: "success",
    msg: "Producto modificado",
    payload: modifiedProduct,
  }); 
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const {id}= req.params;
    //const deleteProduct = await productManager.deleteProduct(id);
    const deleteProduct = await productService.deleteOne(id);
    return res.status(201).json({
    status: "success",
    msg: "Producto borrado",
    payload: deleteProduct,
  }); 
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});


module.exports = router;