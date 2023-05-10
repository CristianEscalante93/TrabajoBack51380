const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductManager= require("../ProductManager.js");
const productManager = new ProductManager();
const CartManager= require("../cartsManager.js");
const cartManager = new CartManager();



router.get('/', async (req,res)=>{
  try {
    const limit= req.query.limit;
  const carts= await cartManager.getCarts();
  if(limit){
    res.status(200).json({
      status: "success",
      msg: "Lista de productos limitada",
      payload: carts.slice(0,limit),
    })
  }else{
    res.status(200).json({
      status: "success",
      msg: "Lista de productos",
      payload: carts,
    });
  }
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
});


router.post("/", async (req, res) => {
  try {
  const addCart = await cartManager.addCart();
    res.status(201).json({
    status: "success",
    msg: "Carrito creado",
    payload: addCart,
  }); 
  } catch (error) {
    res.status(500).json({message:"Error"});
  }
  
});

router.get("/:idCart/products", async (req, res) => {
  try {
    const {idCart} = req.params;
    const carts = await cartManager.getCarts();
    const cartId = carts.find((cart) => cart.id == idCart);
    res.status(201).json({
      status: "success",
      msg: "Carrito id",
      payload: cartId,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      payload: err,
    });
  }
});

router.put("/:idCart/products/:idProduct", async (req, res) => {
  try {
    const {idCart} = req.params;
    const {idProduct} = req.params;
    const selectedCar = await cartManager.addProduct(idCart,idProduct);
  
    res.status(201).json({
      status: "success",
      msg: "Carrito seleccionado",
      payload: selectedCar,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});


module.exports = router;