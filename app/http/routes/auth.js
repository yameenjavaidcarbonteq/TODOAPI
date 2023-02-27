import authController from '../../../adapters/controllers/authController';
import userDbRepository from '../../../application/repositories/userDbRepository';
import userDbRepositoryMongoDB from '../../database/mongoDB/repositories/userRepositoryMongoDB';
import authServiceInterface from '../../../application/services/authService';
import authServiceImpl from '../../services/authService';

export default function authRouter(express) {
  const router = express.Router();

  // load controller with dependencies
  const controller = authController(
    userDbRepository,
    userDbRepositoryMongoDB,
    authServiceInterface,
    authServiceImpl
  );

  // POST enpdpoints
  router.route('/').post(controller.loginUser);

  return router;


////////////////////////////////////
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/authController');
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