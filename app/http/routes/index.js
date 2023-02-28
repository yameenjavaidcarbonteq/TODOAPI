import todoRouter from './todo';
import userRouter from './user';
import authRouter from './auth';

export default function routes(app, express, redisClient) {
  app.use('/api/v2/todos', todoRouter(express));
  app.use('/api/v2/users', userRouter(express));
  app.use('/api/v2/login', authRouter(express));
}