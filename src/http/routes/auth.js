const passport = require("passport");
const AuthController = require('../controllers/authController');



function authRouter(express) {
    
    const router = express.Router();
    const controller = new AuthController();
    
    const userController = new controller.userController();
    const sendToken = controller.tokenController.sendToken;
    
    // Logout the session
    router.get(
        "/logout", 
        controller.logout
    );
    
    // Local Signup
    router.post(
        "/signup",
        // userController.isEmailUsed,
        controller.registrationController.createNewUserLocal,
        sendToken
    );
    // Local Login
    router.post(
        "/login",
        passport.authenticate("local", { session: false }),
        sendToken
    );

    // Google Authenticate
    router.get(
        "/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
    );
    // Google Callback Authenticate
    router.get(
        "/google/callback",
        passport.authenticate("google", { session: false }),
        sendToken
        );

    
    return router;
}

module.exports = authRouter;