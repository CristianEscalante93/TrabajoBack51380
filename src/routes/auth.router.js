const express= require('express');
const { UserModel }= require('./../DAO/models/users.model.js');
const { isAdmin, isUser }= require('../middlewares/auth.js');
const passport= require('passport');
const UserController = require ("../controllers/user.controller.js")
const userController = new UserController

const authRouter = express.Router();

authRouter.get('/session', userController.getSession);

authRouter.get('/perfil', isUser, userController.getPerfil);

authRouter.get('/admin', isUser, isAdmin, userController.getAdmin);

authRouter.get('/logout', userController.getLogOut);

authRouter.get('/login', userController.getLogin);

authRouter.post('/login', userController.getAuthLogin, userController.postLogin);

authRouter.get('/faillogin', userController.getFailLogin);


authRouter.get('/register', userController.getRegister);

authRouter.post('/register', userController.getAuthRegister, userController.postRegister);

authRouter.get('/failregister', userController.getFailRegister);


module.exports = authRouter;