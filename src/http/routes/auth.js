const passport = require ("passport");
const {
    logger,
    config
} = require("@infrastructure");

const {
    UserStoreFactory
} = require ('../../infrastructure/');

const {
    TokenController,
    UserController,
} = require ('../../http/controllers');

function authRouter(express) {
    
    const router = express.Router();
    
    const repository = UserStoreFactory.getStore(config.dbtype);
    logger.info(`Injecting the repository`);
    const userController = new UserController(repository);
    const sendToken = TokenController.sendToken;
    
    // Logout the session
    router.get(
        "/logout", 
        userController.logout
    );
    
    // Local Signup
    router.post(
        "/signup",
        userController.register,
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

module.exports = {
    authRouter
};