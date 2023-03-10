const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const {configJWT} = require("./configStrategies");
const {authorization} = require("../controllers/tokenController");

passport.use(new JWTStrategy(configJWT, authorization));


