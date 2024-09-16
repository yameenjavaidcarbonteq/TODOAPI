const passport = require ("passport");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// consting Configs
const {
  configLocal,
  configGoogle
} = require ("./configStrategies");

// consting Handlers
const {
  loginLocal,
  loginGoogle
} = require ("./handlers")




passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(configLocal, loginLocal));
passport.use(new GoogleStrategy(configGoogle, loginGoogle));
