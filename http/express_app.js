const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const Route = require('./routes/route');


const path = require('path');

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const PORT = 8005;

app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "QASWQASWQASWQASWQASWQASW",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
    },
  }));



const todoRoutes = Route.create('todo');
todoRoutes.createRoutes();
const authRoutes = Route.create('user');
authRoutes.createRoutes();


// Use the router
app.use('/', authRoutes.router);
// Use the middleware to authenticate from session token in cookies
app.use(authMiddleware);
app.use('/', todoRoutes.router);



app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
