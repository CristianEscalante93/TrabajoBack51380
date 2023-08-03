const fs = require("fs");
const ProductManager = require("./DAO/ProductManager");
const productManager = new ProductManager();

class CartManager {
  constructor() {
    this.path = "./src/carts.json";
  }

  getCarts= async()=>{
    try {
      if(!fs.existsSync(this.path)){
        await fs.promises.writeFile(this.path, "[]");
        return [];
        
      }else{
        let cartsString = await fs.promises.readFile(this.path, "utf-8");
        let carts= JSON.parse(cartsString);
        return  carts;
      }
    } catch (error) {
      return error;
    }
  }

  addCart = async()=>{
    try {
      let carts= await this.getCarts();
      let nextId = await this.getNextId(carts);
      let newCart= {products : [], id: nextId};
      carts.push(newCart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
      return newCart;
      } catch (error) {
      return error ;
    }
  }

  async getNextId(Products) {
    let lastId = 0;
    const allIdsArray = Products.map((product) => product.id);
    allIdsArray.filter((id) => typeof id === "number");
    if (allIdsArray.length > 0) {
      lastId = Math.max(...allIdsArray);
    }
    return lastId + 1;
  }

  async addProduct(cartId, productId) {
    const Carts = await this.getCarts();
    const selectedCart = Carts.find((cart) => cart.id == cartId);
    
    const products = await productManager.getProducts();
    const selectedProduct= products.find((product) => product.id == productId);
    
    const productInCart = await selectedCart.products.find((product) => product.id == selectedProduct.id);

    if (productInCart) {
      const idx = selectedCart.products.indexOf(productInCart);
      const newProduct = {...productInCart,quantity : productInCart.quantity + 1};
      selectedCart.products[idx] = newProduct;
      const index= Carts.indexOf(selectedCart);
      Carts[index] = selectedCart;
      await fs.promises.writeFile(this.path, JSON.stringify(Carts, null, 2))
      return selectedCart;
    }
    const newProduct = {id: selectedProduct.id,quantity: 1,};
    selectedCart.products.push(newProduct);
    const index= Carts.indexOf(selectedCart);
    Carts[index] = selectedCart;
    await fs.promises.writeFile(this.path, JSON.stringify(Carts, null, 2))
    return selectedCart;
  }


}

module.exports = CartManager;