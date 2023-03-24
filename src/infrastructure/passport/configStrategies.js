const {config} = require  ('@config');
const { ExtractJwt } = require  ('passport-jwt');

const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret
};

const configLocal = {
  usernameField: "email",
  passwordField: "password"
};
  
const configGoogle = {
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: config.callbackURL
};


module.exports = {
  configLocal,
  configGoogle,
  configJWT,
}