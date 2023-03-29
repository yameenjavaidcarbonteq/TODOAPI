const { 
  application,
  googleAuth 
} = require  ('@config');
const { ExtractJwt } = require  ('passport-jwt');

const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: application.jwtsecret
};

const configLocal = {
  usernameField: "email",
  passwordField: "password"
};
  
const configGoogle = {
  clientID: googleAuth.clientID,
  clientSecret: googleAuth.clientSecret,
  callbackURL: googleAuth.callbackURL
};


module.exports = {
  configLocal,
  configGoogle,
  configJWT,
}