const passport= require('passport');
const local = require('passport-local');
const { createHash, isValidPassword }= require('../utils.js');
const { UserModel }= require('../DAO/models/users.model.js');
const GitHubStrategy= require('passport-github2');
const LocalStrategy = local.Strategy;
const fetch= require('node-fetch');
const CartService = require('../services/carts.service.js');
const cartService = new CartService();
require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


function iniPassport() {

//LOCAL
  passport.use(
    'login',
    new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
      try {
        const user = await UserModel.findOne({ email: username });
        if (!user) {
          console.log('User Not Found with username (email) ' + username);
          return done(null, false);
        }
        if (!isValidPassword(password, user.password)) {
          console.log('Invalid Password');
          return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: 'email',
      },
      async (req, username, password, done) => {
        try {
          const { email, firstName, lastName,age } = req.body;
          let user = await UserModel.findOne({ email: username });
          if (user) {
            console.log('User already exists');
            return done(null, false);
          }
          const newCart = await cartService.createCart();
          const cartID = newCart._id.toString();
          const newUser = {
            email,
            firstName,
            lastName,
            age,
            cartID,
            isAdmin: false,
            password: createHash(password),
          };
          let userCreated = await UserModel.create(newUser);
          console.log(userCreated);
          console.log('User Registration succesful');
          return done(null, userCreated);
        } catch (e) {
          console.log('Error in register');
          console.log(e);
          return done(e);
        }
      }
    )
  );

//GITHUB
passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/api/sessions/githubcallback',
    },
    async (accesToken, _, profile, done) => {
      console.log(profile);
      try {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: {
            Accept: 'application/vnd.github+json',
            Authorization: 'Bearer ' + accesToken,
            'X-Github-Api-Version': '2022-11-28',
          },
        });
        const emails = await res.json();
        const emailDetail = emails.find((email) => email.verified == true);

        if (!emailDetail) {
          return done(new Error('cannot get a valid email for this user'));
        }
        profile.email = emailDetail.email;

        let user = await UserModel.findOne({ email: profile.email });
        if (!user) {
          const newCart = await cartService.createCart();
          const cartID = newCart._id.toString();

          const newUser = {
            email: profile.email,
            firstName: profile._json.name || profile._json.login || 'noname',
            lastName: 'nolast',
            age: profile.age,
            isAdmin: false,
            password: 'nopass',
            cartID: cartID || ''
          };
          let userCreated = await UserModel.create(newUser);
          console.log('User Registration succesful');
          return done(null, userCreated);
        } else {
          console.log('User already exists');
          return done(null, user);
        }
      } catch (e) {
        console.log('Error en auth github');
        console.log(e);
        return done(e);
      }
    }
  )
);




  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await UserModel.findById(id);
    done(null, user);
  });
}


module.exports = {iniPassport};