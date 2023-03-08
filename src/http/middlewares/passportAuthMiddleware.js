const logger = require('../../infrastructure/logger/index');
const passport = require('passport');
require('../utils/AuthStrategiesPassport');

function passportAuthenticate(){
  const authenticateLocal = passport.authenticate('local', {
    failureRedirect: false, 
    successRedirect: '/auth/todos',
  });

  const authenticateWithGoogle = passport.authenticate('google', {
      scope: ['profile', 'email']
  });

  const authenticateGoogleCallback = passport.authenticate('google', {
    failureRedirect: false,
    successRedirect: '/auth/todos'
  });

  return {
    authenticateLocal,
    authenticateWithGoogle,
    authenticateGoogleCallback
  };
}

module.exports = passportAuthenticate;