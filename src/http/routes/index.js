const todoRouter = require('./todo');
const userRouter = require('./user');
const authRouter = require('./auth');

function routes(app, express) {
  app.use('/todos', todoRouter(express));
  app.use('/users', userRouter(express));
  app.use('/', authRouter(express));
}

module.exports = routes;