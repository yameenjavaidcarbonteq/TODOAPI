import { application, googleAuth } from '@config';
import { ExtractJwt } from 'passport-jwt';



export const configJWT = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: application.jwtsecret,
};

export const configLocal = {
  usernameField: 'email',
  passwordField: 'password',
};

export const configGoogle = {
  clientID: googleAuth.clientID as string,
  clientSecret: googleAuth.clientSecret as string,
  callbackURL: googleAuth.callbackURL as string,
  passReqToCallback: true as true
};
