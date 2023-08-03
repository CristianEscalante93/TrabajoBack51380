const passport= require('passport');
const express= require('express');
const sessionsRouter = express.Router();
const UserController = require ("../controllers/user.controller.js")
const userController = new UserController

sessionsRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
sessionsRouter.get('/githubcallback',passport.authenticate('github', { failureRedirect: '/login' }) ,userController.getGitHubCallback);
sessionsRouter.get('/show', userController.getShow);
sessionsRouter.get("/current", userController.getCurrent);

module.exports = sessionsRouter;