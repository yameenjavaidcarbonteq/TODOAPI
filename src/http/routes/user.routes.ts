import { Router } from 'express';
import passport from 'passport';
import { UserController } from '@http';
import { logger } from '@infrastructure';

export class UserRouter {
  private router: Router;
  private userController: UserController;

  constructor() {
    logger.log("info", "Initiating user Router");
    this.router = Router();
    this.userController = new UserController( );

    this.router.use(passport.authenticate('jwt', { session: false }));
    
    this.router.get   ('/'              , this.userController.getAllUsers);
    this.router.get   ('/:userId'       , this.userController.getUserById);
    this.router.post  ('/'              , this.userController.createUser);
    this.router.put   ('/:userId/edit'  , this.userController.updateUser);
    this.router.delete('/:userId/delete', this.userController.deleteUser);
  }

  getRouter(): Router {
    logger.log("info", "Returning user Router");
    return this.router;
  }
}

