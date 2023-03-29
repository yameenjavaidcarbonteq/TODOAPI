const { todoRouter } = require ('./todo');
const { userRouter } = require ('./user');
const { authRouter } = require ('./auth');



const routes = (app, express) => {
  const router = express.Router();
  router.get("/api", (req, res) => {
    res.status(200).json({
      author: "Yameen Javaid",
      project: "Todo API",
      company: "Carbonteq",
      message: "Welcome to Todo API Carbonteq."
    });
  });
  
  app.use(router)
  app.use('/api/auth', authRouter(express));
  app.use('/api/users', userRouter(express));
  app.use('/api/todos', todoRouter(express));
}


module.exports = {routes};
