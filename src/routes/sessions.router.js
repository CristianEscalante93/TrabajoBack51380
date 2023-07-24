const passport= require('passport');
const express= require('express');
const sessionsRouter = express.Router();
const UserController = require ("../controllers/user.controller.js")
const userController = new UserController

sessionsRouter.get('/github', userController.getGitHub);
sessionsRouter.get('/githubcallback', userController.getGitHubCallback);
sessionsRouter.get('/show', userController.getShow);
sessionsRouter.get("/current", userController.getCurrent);

module.exports = sessionsRouter;