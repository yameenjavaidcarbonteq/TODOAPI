const express = require('express');
const authController = require("../controllers/auth.controller");

const router = express.Router();




router.get('/login', (req, res, next) => {
    res.render('login', { title: 'Login' });
    const {username} = res.body.username;
    console.log({username});
});

router.post('/login', authController.login);

router.get('/register',(req,res) => {
    res.render('signup', { title: 'Register' })
});
router.post('/register', authController.register);


router.post('/logout', authController.logout);

module.exports = router;