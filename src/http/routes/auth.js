const AuthController = require('../controllers/authController');
const passportAuthMiddleware = require('../middlewares/passportAuthMiddleware')();

function authRouter(express) {
    
    const router = express.Router();
    const controller = new AuthController();
    
    router.post('/signup',controller.signup);
    router.get('/logout', controller.logout);
    
    router.post('/login', passportAuthMiddleware.authenticateLocal);
    router.get('/google', passportAuthMiddleware.authenticateWithGoogle);
    router.get('/google/callback', passportAuthMiddleware.authenticateGoogleCallback);

    return router;
}

module.exports = authRouter;