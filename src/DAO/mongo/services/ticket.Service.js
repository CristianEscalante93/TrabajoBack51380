const { TicketModel } = require("../models/ticket.model");

class TicketService{
  async addTicket(newTicket) {
    try {
    const ticket = await TicketModel.create(newTicket);
    ticket.code = ticket._id.toString();
    await TicketModel.findByIdAndUpdate(ticket._id, { code: ticket.code });
    return ticket;
    } catch (err) {
      throw (`FALLO EN MODELO.`);
    }
  }

  async addTicket2(purchaser, ticket, totalCart) {
    try {
      const ticketData = {
        code: "", 
        purchase_datetime: new Date(), 
        amount: totalCart,
        purchaser: purchaser,
        products : ticket            
    };              
    const savedTicket = await addTicket(ticketData);
    return savedTicket;
    } catch (error) {
    throw (`FALLO EN SERVICIO. ${error}`);
    }
}

async  stockCartProductsForTicket(cartId) {
    try {
        const cartProductsTicket = await cartService.getCartById(cartId);
        let cartWithStock = [];
        let cartWithOutStock = [];
        let totalPriceTicket = 0;

        cartProductsTicket.cartProducts.forEach((item) => {
            const idProduct = item.idProduct;
            const quantityInCart = parseInt(item.quantity);
            const availableStock = parseInt(idProduct.stock);
            const ticketAmount = parseInt(idProduct.price);

            if (quantityInCart <= availableStock) {
                const totalPriceProduct = ticketAmount * quantityInCart;
                cartWithStock.push({ idProduct, quantity: quantityInCart, totalPrice: totalPriceProduct });
                totalPriceTicket += totalPriceProduct;
            } else {
                cartWithOutStock.push({ idProduct, quantity: quantityInCart });
            }
        });

        return { cartWithStock, cartWithOutStock, totalPriceTicket };
    } catch (err) {
        throw new Error("ERROR.");
    }
}

}

module.exports = TicketService;



