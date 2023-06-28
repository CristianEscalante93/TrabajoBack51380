const express= require('express');
const { UserModel }= require('./../DAO/models/users.model.js');
const { isAdmin, isUser }= require('../middlewares/auth.js');
const passport= require('passport');

const authRouter = express.Router();

authRouter.get('/session', (req, res) => {
  return res.send(JSON.stringify(req.session));
});

authRouter.get('/perfil', isUser, (req, res) => {
  const user = { email: req.user.email, isAdmin: req.user.isAdmin };
  return res.render('perfil', { user: user });
});

authRouter.get('/admin', isUser, isAdmin, (req, res) => {
  return res.send('datos clasificados');
});

authRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { error: 'No se pudo cerrar su sesión :(' });
    } else {
      return res.redirect('/auth/login');
    }
  });
});

authRouter.get('/login', (req, res) => {
  return res.render('login', {});
});

authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/faillogin' }), async (req, res) => {
  
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };
  return res.redirect('/products');
});

authRouter.get('/faillogin', async (req, res) => {
  return res.json({ error: 'fail to login' });
});


authRouter.get('/register', (req, res) => {
  return res.render('register', {});
});

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/failregister' }), (req, res) => {

  if (!req.user) {
    return res.json({ error: 'something went wrong' });
  }
  req.session.user = { _id: req.user._id, email: req.user.email, firstName: req.user.firstName, lastName: req.user.lastName, isAdmin: req.user.isAdmin };

  return res.redirect('/auth/perfil');
});

authRouter.get('/failregister', async (req, res) => {
  return res.json({ error: 'fail to register' });
});


module.exports = authRouter;