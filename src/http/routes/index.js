const todoRouter = require('./todo');
const userRouter = require('./user');
const authRouter = require('./auth');

function routes(app, express) {
  app.use('/auth/', authRouter(express));
  app.use('/auth/todos', todoRouter(express));
  app.use('/auth/users', userRouter(express));
  
}

module.exports = routes;