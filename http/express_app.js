const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const TodoRoutes = require('./routes/todo.routes');
const AuthRoutes = require('./routes/auth.routes');

const path = require('path');

const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
const PORT = 6001;

app.use(express.json());
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


app.set('view engine', 'pug')
console.log(__dirname);
app.set('views', path.join(__dirname, 'views'));


// Use the router
app.use('/', AuthRoutes);
// Use the middleware to authenticate from session token in cookies
app.use(authMiddleware);
app.use('/todo', TodoRoutes);



app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
