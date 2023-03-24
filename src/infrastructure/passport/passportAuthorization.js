const passport = require  ('passport');
const passportJWT = require("passport-jwt");
const JwTStrategy   = passportJWT.Strategy;

const {configJWT} = require ("./configStrategies");
const {
    authorization,
} = require ("./handlers");


passport.use(new JwTStrategy(configJWT, authorization));

