import config from'@config';
import { ExtractJwt } from 'passport-jwt';

export const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtsecret
};

export const configLocal = {
  usernameField: "email",
  passwordField: "password"
};
  
export const configGoogle = {
  callbackURL: config.googleauth.callbackURL,
  clientID: config.googleauth.clientID,
  clientSecret: config.googleauth.clientSecret
};
