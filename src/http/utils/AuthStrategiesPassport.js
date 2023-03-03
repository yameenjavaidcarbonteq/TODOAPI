const config = require('../../infrastructure/config/index');
const logger = require('../../infrastructure/logger/index');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const googleauth = config.googleauth;

const Adapter = require('../../infrastructure/database/useradapter');
const adapter = new Adapter(config.dbtype);
const User = require('../../domain/entities/user');


passport.use(new GoogleStrategy({
    clientID: googleauth.clientID,
    clientSecret: googleauth.clientSecret,
    callbackURL: googleauth.callbackURL
  }, async (accessToken, refreshToken, profile, done) => {
    const username = profile.displayName;
    const googleId = profile.id;
    const email = profile.emails[0].value;
  
    try {
      const user = await adapter.findOne({ 'email': email });
      if (user) {
        return done(null, user);
      } else {
        // Creating new User
        const userEntity = User.create(User.makeid(), username, null, email, true, googleId, 'google');
        const newUser = await adapter.create(userEntity);
        return done(null, newUser);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new Error(`Error: ${error}`);
    }
  }));
  
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const user = await adapter.findOne({ 'email': email });
      if (!user) {
        return done(null, false, { message: "User Doesn't Exist !" });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      
      return done(null, user);
      
    } catch (error) {
      console.error(`Error: ${error}`);
      throw new Error(`Error: ${error}`);
    }
  }));
  
  passport.serializeUser(function (user, done) {
    console.info(`Serializing this user: ${user}`, user);
    done(null, user.id);
  });
  
  passport.deserializeUser(async function (id, done) {
    console.info(`Deserializing this Id: ${id}`);
    try {
      const user = await adapter.findOne({ 'id': id });
      if (user) {
        done(null, user);
      }
  
    } catch (error) {
      const errorMessage = `Error: ${error}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  
  });



  