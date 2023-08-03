//@ts-check
const { Schema, model }= require('mongoose');

const schema = new Schema(
  {
    code: { type: String, unique: true, required: true},
    purchase_datetime: { type: Date},
    amount: { type: Number},
    purchaser: { type: String},
    products: [ { idProduct: { type: Object }, _id: false, quantity: { type: Number }, totalPrice: { type: Number } } ]
  }
);

const TicketModel = model('tickets', schema);
module.exports = {TicketModel};
