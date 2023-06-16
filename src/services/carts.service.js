const { CartsModel }= require('../DAO/models/carts.model.js');
const { ProductsModel }= require('../DAO/models/products.model.js');


class CartService {
  async getAll() {
    try {
      const cart = await CartsModel.find({});
      return cart;
    } catch (error) {
      throw error;
    }
  }
  async createCart() {
    try {
      const cart = await CartsModel.create({});
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await CartsModel.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
      throw error;
    }
  }


  async addProductToCart(cartId, productId) {
    try {
      const product = await ProductsModel.findById(productId).lean();
      if (!product) {
        throw new Error('Product not found');
      }
      const cart = await CartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productIndex = cart.products.findIndex(item => item.product._id.toString() === productId)
      if (productIndex === -1) {
        cart.products.push({
          product: product._id,
          quantity: 1
        })
        return await cart.save()
      }
      if (product.stock < cart.products[productIndex].quantity + 1) throw new NoStockProductException(pid)
      cart.products[productIndex].quantity += 1
      return await cart.save()
    } catch (error) {
      throw error;
    }
  }

  async cleanCart(cid) {
    const cart = await CartsModel.findById(cid);
    if (!cart) {
      throw new Error('Cart not found');
    }
    cart.products = [];

    return await cart.save();
  }

  async updateCart(cartId, products) {
    try {
      const cart = await CartsModel.findByIdAndUpdate(cartId, {products:products},{ new: true });
      return cart;
    } catch (error) {
      throw new Error("Error updating cart in database");
    }
  }

  async updateProductQuantity(cartId, productId, quantity) {
    try {
      
      const cart = await CartsModel.findById(cartId);
      const productIndex = cart.products.findIndex((product) => product.product.toString() == productId);
      
      if (productIndex === -1) {
        throw new Error("Product not found in cart");
      }
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error updating product quantity in cart");
    }
  }

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await CartsModel.findById(cartId);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const productIndex = cart.products.findIndex((product) => product.product.toString() === productId);
      if (productIndex === -1) {
        throw new Error('Product not found in the cart');
      }

      if (cart.products[productIndex].quantity > 1) {
        cart.products[productIndex].quantity -= 1;
      } else {
        cart.products.splice(productIndex, 1);
      }

      const savedCart = await cart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = CartService;