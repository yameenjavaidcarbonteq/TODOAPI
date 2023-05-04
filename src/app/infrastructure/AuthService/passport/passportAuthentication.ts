import passport from "passport";
import { Strategy as LocalStrategy }from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { configLocal, configGoogle } from "./configStrategies";
import { loginLocal, loginGoogle } from "./handlers";

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.use(new LocalStrategy(configLocal, loginLocal));
passport.use(new GoogleStrategy(configGoogle, loginGoogle));
