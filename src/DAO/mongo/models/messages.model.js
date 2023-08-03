//@ts-check
const { Schema, model }= require('mongoose');

const schema = new Schema({
  user: { type: String, required: true, max: 100 },
  message: { type: String, required: true, max: 100 },
  comments: [
    {
      text: String,
    },
  ],
});

const ChatModel = model('messages', schema);

module.exports = {ChatModel};
