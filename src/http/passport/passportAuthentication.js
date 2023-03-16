import config from '@config';
import passport from"passport";
import {LocalStrategy} from "passport-local";
import {GoogleStrategy} from "passport-google-oauth20";

import { GoogleStrategy } from "passport-google-oauth20";

// Importing Configs
import {
  configLocal,
  configGoogle
} from "./configStrategies";

// Importing Handlers
import {
  loginLocal,
  loginGoogle
} from "./handlers"




passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(configLocal, loginLocal));
passport.use(new GoogleStrategy(configGoogle, loginGoogle));
