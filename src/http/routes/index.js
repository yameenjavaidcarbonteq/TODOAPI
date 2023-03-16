const express from"express");
const router = express.Router();

const todoRouter from'./todo');
const userRouter from'./user');
const authRouter from'./auth');



function routes(app, express) {
  
  router.get("/", (request, response) => {
    response.json({
      author: "Yameen Javaid",
      project: "Todo API",
      company: "Carbonteq",
      message: "Welcome to Todo API Carbonteq."
    });
  });
  
  app.use('/auth', authRouter(express));
  app.use('/auth/users', userRouter(express));
  app.use('/auth/todos', todoRouter(express));
  
  
}

module.exports = routes;