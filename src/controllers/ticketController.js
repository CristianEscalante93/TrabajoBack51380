const CartService = require("../DAO/mongo/services/carts.service.js")
const cartService= new CartService
const TicketService = require("../DAO/mongo/services/ticket.Service.js")
const ticketService= new TicketService;


class TicketsController {

  async addTicket(req, res) {  
      try {
        const {cid}= req.params
        const user = req.session.user
        const userCartId = user.cartID;
        const purchaser = user.email;
        const ticketPreview = await ticketService.stockCartProductsForTicket(userCartId);
        const ticket = ticketPreview.cartWithStock;
        const totalCart = ticketPreview.totalPriceTicket;
        const oldProductsCart = ticketPreview.cartWithOutStock;
        
        await cartService.updateCart(userCartId, oldProductsCart);
        const response = await ticketService.addTicket2(purchaser, ticket, totalCart);
        const savedTicket= response.ticket
        const code = response.code
        
        return res.render("finishticket",{ ticket, totalCart, purchaser,savedTicket,code});      
      }catch (error) {
        req.logger.error({
          message: error.message,
          stack: JSON.stringify(error.stack, null, 2),
        });
        res.status(500).json({ Error: `${error}` });
      };
  };

  async checkOut(req, res) {  
    try {
      const user = req.session.user;
      const userCartId = user.cartID;
      
      const cartProducts = await cartService.getCartById(userCartId);
      const product = cartProducts.products
      
      let prod = product.map((doc) => {
        return {
          title: doc.product.title,
          description: doc.product.description,
          price: doc.product.price,
          thumbnail: doc.product.thumbnail,
          code: doc.product.code,
          stock: doc.product.stock,
          category: doc.product.category,
          _id: doc.product._id,
          quantity: doc.quantity,
          total:doc.product.price * doc.quantity
        };
      });

      const ticketPreview = await ticketService.stockCartProductsForTicket(userCartId);
      
      return res.render("ticket", { user, products:prod,ticketPreview,userCartId });
    }catch (error) {
      res.status(500).json({ error });
      req.logger.error({
        message: error.message,
        stack: JSON.stringify(error.stack, null, 2),
      });
    };
  };
  
};


module.exports = TicketsController;
