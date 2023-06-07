const express= require("express");
const { Router } = require("express");
const router = Router();
const ProductManager= require("../DAO/ProductManager.js");
const productManager = new ProductManager();
const CartManager= require("../cartsManager.js");
const CartService = require("../services/carts.service.js");
const cartManager = new CartManager();

const cartservice= new CartService

router.get('/', async (req,res)=>{
  try {
    const limit= req.query.limit;
  //const carts= await cartManager.getCarts();
  const carts= await cartservice.getAll();
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
  //const addCart = await cartManager.addCart();
  const addCart = await cartservice.createCart();
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
    //const carts = await cartManager.getCarts();
    //const cartId = carts.find((cart) => cart.id == idCart);
    const cartId = await cartservice.getCartById(idCart);
  if(!cartId){
    return res.status(404).json({ status: 'error', message: `cart ${idCart} not found` });
  }
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
    //const selectedCar = await cartManager.addProduct(idCart,idProduct);
    const cart = await cartservice.addProductToCart(idCart, idProduct);
  
    res.status(201).json({
      status: "success",
      msg: "Carrito seleccionado",
      payload: cart,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      status: "error",
      payload: err.message,
    });
  }
});

router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const idCart = req.params.cid;
    const idProduct = req.params.pid;
    const cart = await cartservice.removeProductFromCart(idCart, idProduct);
    return res.status(200).json({
      status: 'success',
      msg: 'Product removed from cart',
      payload: cart,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      status: 'error',
      msg: error.message,
    });
  }
});


module.exports = router;