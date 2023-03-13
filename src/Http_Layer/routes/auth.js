const AuthController = require('../controllers/authController');
const UserController = require('../controllers/userController');
const TokenController = require('../controllers/tokenController');

const userRepositoryAdapter = require ('../../Infrastructure_Layer/database/useradapter');
const config = require ('../../Infrastructure_Layer/config/index');


const passport = require("passport");



function authRouter(express) {
    
    const router = express.Router();
    
    const controller = new AuthController(
        new userRepositoryAdapter(config.dbtype)
    );
    const userController = new UserController(
        new userRepositoryAdapter(config.dbtype)
    );
    const sendToken = TokenController.sendToken;
    
    // Logout the session
    router.get(
        "/logout", 
        controller.logout
    );
    
    // Local Signup
    router.post(
        "/signup",
        // userController.isEmailUsed,
        controller.createNewUserLocal,
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
        "/googlecallback",
        passport.authenticate("google", { session: false }),
        sendToken
        );

    
    return router;
}

module.exports = authRouter;