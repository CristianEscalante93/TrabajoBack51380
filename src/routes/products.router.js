const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductManager= require("../ProductManager.js");
const productManager = new ProductManager();

router.get('/', async (req,res)=>{
  try {
    const limit= req.query.limit;
  const products= await productManager.getProducts();
  if(limit){
    res.status(200).json({
      status: "success",
      msg: "Lista de productos limitada",
      payload: products.slice(0,limit),
    })
  }else{
    res.status(200).json({
      status: "success",
      msg: "Lista de productos",
      payload: products,
    });
  }
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});

router.get('/:id',async (req,res)=>{
  try {

    const {id}= req.params;
    console.log(id)
  const product = await productManager.getProductById(parseInt(id));
  
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
    const newProduct = req.body;
  const addProduct = await productManager.addProduct(newProduct);
    res.status(201).json({
    status: "success",
    msg: "Producto creado",
    payload: addProduct,
  }); 
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
  
});

router.put("/:id", async (req, res) => {
  try {
    const {id}= req.params;
    const newProduct = req.body;
    const modifiedProduct = await productManager.updateproduct(id,newProduct);
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
    const deleteProduct = await productManager.deleteProduct(id);
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