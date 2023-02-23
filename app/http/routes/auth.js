const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auth');
const passport = require('passport');

require('../utils/passportLocal')(passport);
require('../utils/googleAuth')(passport);

const User = require('../../infrastructure/mongo_models/user');

const controller = new UserController();

router.post('/signup',controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);


router.get('/google', passport.authenticate('google', { scope: ['profile', 'email',] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: false }), (req, res) => {
    res.redirect('/');
});




// router.post('/signup', async (req, res, next) => {
//     const username = req.body.username
//     const email = req.body.email;
//     const password = req.body.password;

//     const exists = await User.findOne({ email: email });
//     if (exists) {
//         res.json({ message: "User Doesn't Exist !"});
//     }
    
    
//     const new_user = new User(
//     {
//         username: username,
//         email: email,
//         password: password,
//         googleId: null,
//         provider: 'email',
//     });
    
//     new_user.save((err) => 
//     {
//         if (err) 
//         {
//             return next(err);
//         }
//         req.logIn(new_user, (err) => 
//         {
//             if (err) 
//             {
//                 return next(err);
//             }
//             return res.redirect('/');
//         });
//     });
// });

// router.get('/logout', (req, res) => {
//     req.logout();
//     req.session.destroy(function (err) {
//         res.redirect('/');
//     });
// });







module.exports = router;