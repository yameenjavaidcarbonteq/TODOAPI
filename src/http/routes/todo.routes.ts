import { Router } from 'express';
import passport from 'passport';
import { TodoController } from '@http';
import { logger } from '@infrastructure';

export class TodoRouter {
  private router: Router;
  private todoController: TodoController;

  constructor() {
    logger.log("info", "Initiating todo Router");
    this.router = Router();
    this.todoController = new TodoController();

    this.router.use(passport.authenticate('jwt', { session: false }));
    
    this.router.get   ('/:userId/'              , this.todoController.getAllTodos);
    this.router.get   ('/:userId/:todoId/'      , this.todoController.getTodoById);
    this.router.post  ('/:userId/'              , this.todoController.createTodo);
    this.router.put   ('/:userId/:todoId/edit'  , this.todoController.updateTodo);
    this.router.delete('/:userId/:todoId/delete', this.todoController.deleteTodo);
  }

  getRouter(): Router {
    logger.log("info", "Returning todo Router");
    return this.router;
  }
}




