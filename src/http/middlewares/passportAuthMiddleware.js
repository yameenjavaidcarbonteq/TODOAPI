const passport = require('passport');
require('../utils/AuthStrategiesPassport');

function passportAuthenticate(){
  const authenticateLocal = passport.authenticate('local', {
    failureRedirect: false, 
    successRedirect: '/todos',
  });

  const authenticateWithGoogle = passport.authenticate('google', {
      scope: ['profile', 'email']
  });

  const authenticateGoogleCallback = passport.authenticate('google', {
    failureRedirect: false,
    successRedirect: '/todos'
  });

  return {
    authenticateLocal,
    authenticateWithGoogle,
    authenticateGoogleCallback
  };
}

module.exports = passportAuthenticate;