const config = require('../../Infrastructure_Layer/config');
const ExtractJwt = require("passport-jwt").ExtractJwt;


const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret
};

const configLocal = {
  usernameField: "email",
  passwordField: "password"
};
  
const configGoogle = {
  callbackURL: config.googleauth.callbackURL,
  clientID: config.googleauth.clientID,
  clientSecret: config.googleauth.clientSecret
};

module.exports = {
  configJWT,
  configLocal,
  configGoogle,
}