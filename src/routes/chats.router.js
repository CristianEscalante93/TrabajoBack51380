const express= require('express');
const chatRouter = express.Router();
const ChatController = require ("../controllers/chat.controller")
const chatController = new ChatController

chatRouter.get('/', chatController.getChat);

module.exports = chatRouter;