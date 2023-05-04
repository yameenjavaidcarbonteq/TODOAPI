import { Router, Express } from 'express';
import { TodoRouter } from './todo.routes';
import { UserRouter } from './user.routes';
import { AuthRouter } from './auth.routes';
import { logger } from '@infrastructure';

export const routes = (app: Express): void => {
  logger.log("info", "Index Route");
  const router = Router();

  router.get('/api', (req, res) => {
    res.status(200).json({
      author: 'Yameen Javaid',
      project: 'Todo API',
      company: 'Carbonteq',
      message: 'Welcome to Todo API Carbonteq.',
    });
  });

  app.use(router);
  app.use('/api/todos', new TodoRouter().getRouter());
  app.use('/api/users', new UserRouter().getRouter());
  app.use('/api/auth', new AuthRouter().getRouter());
};