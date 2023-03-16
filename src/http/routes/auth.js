import config from '@config';
import {UserController} from '@controllers';
import {TokenController} from '@controllers';

import {userRepositoryAdapter} from '@infrastructure/database/UserAdapter';



import passport from "passport";



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
        "/google/callback",
        passport.authenticate("google", { session: false }),
        sendToken
        );

    
    return router;
}

module.exports = authRouter;