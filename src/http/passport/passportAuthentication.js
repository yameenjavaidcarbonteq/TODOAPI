const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
//Importing Configs
const {
  configLocal,
  configGoogle
} = require("./configStrategies");

// Importing Handlers
const { loginLocal, loginGoogle } = require("../controllers/loginController");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(configLocal, loginLocal));
passport.use(new GoogleStrategy(configGoogle, loginGoogle));
