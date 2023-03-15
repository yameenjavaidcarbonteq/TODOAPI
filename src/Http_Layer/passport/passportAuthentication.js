const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
// Importing Configs
const {
  configLocal,
  configGoogle
} = require("./configStrategies");

// Importing Handlers

const AuthController = require('../controllers/authController');

const userRepositoryAdapter = require ('../../Infrastructure_Layer/database/useradapter');
const config = require ('../../Infrastructure_Layer/config');

const authController = new AuthController(
  new userRepositoryAdapter(config.dbtype)
);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(configLocal, authController.loginLocal));
passport.use(new GoogleStrategy(configGoogle, authController.loginGoogle));
