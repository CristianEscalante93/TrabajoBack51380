//@ts-check
const { Schema, model }= require('mongoose');
const monsoosePaginate= require('mongoose-paginate-v2');

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },

  pass: {
    type: String,
    required: true,
    max: 100,
  },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});
schema.plugin(monsoosePaginate);
const UserModel = model('users', schema);
module.exports = {UserModel};
