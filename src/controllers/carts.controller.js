const CartService = require("../DAO/mongo/services/carts.service.js");
const cartservice= new CartService

class CartsController {

  async cartIdVista(req,res){
    try {
      const { cid } = req.params;
      const cartId= req.user.cartID;
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
      res.render("cart", { cart: simplifiedCart, cartId });
    } catch (error) {
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

  async getCartApi(req,res){
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
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

  async postCartApi(req,res){
    try {
      //const addCart = await cartManager.addCart();
      const addCart = await cartservice.createCart();
        res.status(201).json({
        status: "success",
        msg: "Carrito creado",
        success: true,
        payload: JSON.parse(JSON.stringify(addCart._id)),
      }); 
      req.logger.info("carrito creado");
      } catch (error) {
        res.status(500).json({message:"Error"});
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
      }
  }

  async getIdCartApi(req,res){
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
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

  async postProductInCart(req,res){
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
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

  async deleteProductInCart(req,res){
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
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    }
  }

  async deleteCart(req,res){
    try {
      const cid = req.params.cid;
      const cart = await cartservice.cleanCart(cid);
      return res.status(200).json({
        status: 'success',
        msg: 'Product removed from cart',
        payload: cart,
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        msg: error.message,
      });
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
      
    }
  }

  async updateCart(req,res){
    try {
      const { cid } = req.params;
      const { products} = req.body;
      const cart = await cartservice.updateCart(cid, products);
  
    res.status(200).json({ status: "success", message: "Cart updated successfully", cart });
  } catch (error) {
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }

  async updateProductIncart(req,res){
    try {
      const { cid, pid } = req.params;
      const { quantity} = req.body;
      const cart = await cartservice.updateProductQuantity(cid, pid, quantity);
      res
        .status(200)
        .json({ status: "success", message: "Product quantity updated", cart });
    } catch (error) {
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
      res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }

}


module.exports = CartsController;