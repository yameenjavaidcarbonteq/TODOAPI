const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { UserUseCases } = require('../usecases');

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await UserUseCases.registerUser({ username, email, password });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await UserUseCases.loginUser({ username, password });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', authMiddleware, async (req, res, next) => {
  try {
    const result = await UserUseCases.logoutUser(req.user);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;