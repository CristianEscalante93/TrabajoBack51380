//@ts-check
const { Schema, model }= require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const schema = new Schema(
  {
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 150 },
    price: { type: Number, required: true, max: 10000 },
    thumbnail: { type: String, required: false, max: 100 },
    code: { type: String, required: true, max: 100000, unique: true },
    stock: { type: Number, required: true, max: 10000 },
    category: { type: String, required: true, max: 100 },
    status: { type: Boolean, required: true, max: 5 },
  }
);

schema.plugin(mongoosePaginate);
const ProductsModel = model("products", schema);
module.exports = {ProductsModel};


