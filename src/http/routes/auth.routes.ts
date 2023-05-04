import passport from 'passport';
import { GenerateAuthToken, logger } from '@infrastructure';
import { Router } from 'express';
import { UserController } from '@http';
import { IUserProps } from '@domain';


export class AuthRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    logger.log("info", "Initiating user Router");
    this.router = Router();
    this.userController = new UserController();
    
    this.router.post("/signup"  , this.userController.register);
    this.router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
      const user : IUserProps | undefined = req.user as IUserProps;
      if (user) {
        res.json({ 
          message: 'Login succeeded', 
          id: user.uid ,
          token: GenerateAuthToken.generateToken(user.uid as string)
        });
      } else {
        res.status(401).json({ message: 'Login failed'});
      }
    });
    this.router.get ("/google"  , passport.authenticate("google", { scope: ["profile", "email"] }));
    this.router.get ("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
      const user : IUserProps | undefined = req.user as IUserProps;
      if (user) {
        res.json({ 
          message: 'Login succeeded',
          id: user.uid ,
          token: GenerateAuthToken.generateToken(user.uid as string)
        });
      } else {
        res.status(401).json({ message: 'Login failed'});
      }
    });
  }

  getRouter(): Router {
    logger.log("info", "Returning auth Router");
    return this.router;
  }
}
