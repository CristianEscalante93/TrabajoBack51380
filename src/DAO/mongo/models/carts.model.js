const { Schema, model }= require("mongoose");

const schema = new Schema({
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true
      },
      quantity: {
        type: Number,
        required: false,
        min: 1,
        default: 1
      }
    }],
    default: [],
    require: true
  }
}, { versionKey: false })

schema.pre('find', function () {
  this.populate({ path: 'products', populate: { path: '_id', model: 'products' } });
});

schema.pre('findOne', function () {
  this.populate({ path: 'products', populate: { path: '_id', model: 'products' } });
});
schema.pre('findById', function () {
  this.populate({ path: 'products', populate: { path: '_id', model: 'products' } });
});

const CartsModel = model("carts", schema);
module.exports = {CartsModel};