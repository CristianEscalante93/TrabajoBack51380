const { Schema, model }= require("mongoose");

const schema = new Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
});

const CartsModel = model("carts", schema);
module.exports = {CartsModel};