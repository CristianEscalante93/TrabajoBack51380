const CartService = require("../DAO/mongo/services/carts.service.js")
const cartService= new CartService
const TicketService = require("../DAO/mongo/services/ticket.Service.js")
const ticketService= new TicketService;


class TicketsController {



  async addTicket(req, res) {  
      try {
        const user = req.session.user
        const userCartId = user.cartID;
        const purchaser = user.email;
        const ticketPreview = await ticketService.stockCartProductsForTicket(userCartId);
        const ticket = ticketPreview.cartWithStock;
        const totalCart = ticketPreview.totalPriceTicket;
        const oldProductsCart = ticketPreview.cartWithOutStock;
        await cartService.updateCart(userCartId, oldProductsCart );
        await ticketService.addTicket2(purchaser, ticket, totalCart);
        return res.render('finishticket', { ticket, totalCart, purchaser });      
      }catch (err) {
        res.status(500).json({ Error: `${err}` });
      };
  };

  async checkOut(req, res) {  
    try {
      const user = req.session.user;
      const userCartId = user.cartID;
      console.log(userCartId,user.cartID)
      const cartProducts = await cartService.getCartById(userCartId);
      const simplifiedCart = cartProducts.products.map((item) => {
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
      console.log(simplifiedCart)
      const ticketPreview = await ticketService.stockCartProductsForTicket(userCartId);
      return res.render('cart', { cart: simplifiedCart,user, cartProducts,ticketPreview });
    }catch (err) {
      res.status(500).json({ err });
    };
  };
  
};


module.exports = TicketsController;
