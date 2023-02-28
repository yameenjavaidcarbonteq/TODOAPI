const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

export default function userRouter(express) {
  const router = express.Router();

  // GET enpdpoints
  router.route('/:id').get(authMiddleware, controller.fetchUserById);
  router.route('/').get(authMiddleware, controller.fetchUsersByProperty);

  // POST enpdpoints
  router.route('/').post(controller.addNewUser);

  return router;
}
