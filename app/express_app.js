const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const TodoRoutes = require('./http/routes/todo.routes');
const AuthRoutes = require('./http/routes/auth.routes');

const path = require('path');

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const PORT = 8006;

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


// Use the router
app.use('/', AuthRoutes);
// Use the middleware to authenticate from session token in cookies
app.use(authMiddleware);
app.use('/', TodoRoutes);



app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
