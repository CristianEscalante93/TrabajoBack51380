const express= require('express');
const chatRouter = express.Router();
const ChatController = require ("../controllers/chat.controller");
const { isUser } = require('../middlewares/auth');
const chatController = new ChatController

chatRouter.get('/',isUser, chatController.getChat);

module.exports = chatRouter;