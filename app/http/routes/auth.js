const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auth');
const passport = require('passport');

require('../utils/AuthStrategiesPassport');


const controller = new UserController();

router.post('/signup',controller.signup);
router.post('/login', controller.login);
router.get('/logout', controller.logout);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: false }), (req, res) => {
    res.redirect('/');
});






module.exports = router;