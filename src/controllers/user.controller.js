const passport= require('passport');
const { UserModel }= require('./../DAO/models/users.model.js');
const { isAdmin, isUser }= require('../middlewares/auth.js');

class UserController{
  getGitHub(req,res){
    passport.authenticate('github', { scope: ['user:email'] })
  }

  getGitHubCallback(req,res){
    passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
      req.session.user = req.user;
      // Successful authentication, redirect home.
      res.redirect('/products');
    }
  }

  getShow(req,res){
    return res.send(JSON.stringify(req.session))
  }

  getCurrent(req,res){
    console.log(req.session);
    return res.status(200).json({ user: req.session.user });
  }

  getSession(req,res){
    return res.send(JSON.stringify(req.session));
  }

  getPerfil(req,res){
    const user = { email: req.user.email, isAdmin: req.user.isAdmin };
    return res.render('perfil', { user: user })
  }

  getAdmin(req,res){
    return res.send('datos clasificados');
  }

  getLogOut(req,res){
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).render('error', { error: 'No se pudo cerrar su sesión :(' });
      } else {
        return res.redirect('/auth/login');
      }
    });
  }

  getLogin(req,res){
    return res.render('login', {});
  }

  getAuthLogin(req,res){
    passport.authenticate('login', { failureRedirect: '/auth/faillogin' })
  }

  postLogin(req,res){
    if (!req.user) {
      return res.json({ error: 'invalid credentials' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin , cartID: req.user.cartID};
    return res.redirect('/products');
  }

  getFailLogin(req,res){
    return res.json({ error: 'fail to login' });
  }

  getRegister(req,res){
    return res.render('register', {});
  }

  getAuthRegister(req,res){
    passport.authenticate('register', { failureRedirect: '/auth/failregister' });
  }

  postRegister(req,res){
    if (!req.user) {
      return res.json({ error: 'something went wrong' });
    }
    req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName,age: req.user.age, isAdmin: req.user.isAdmin, cartID: req.user.cartID };
  
    return res.redirect('/auth/perfil');
  }

  getFailRegister(req,res){
    return res.json({ error: 'fail to register' });
  }
}

module.exports = UserController;