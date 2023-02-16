const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const TodoRoutes = require('./http/routes/todo.routes');
const AuthRoutes = require('./http/routes/auth.routes');



const host = process.env.HOST;
const port = process.env.PORT;
const dbtype = process.env.DBTYPE;


const app = express();


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
app.use('/', TodoRoutes);


adapter.connect()
  .then(() => {
    console.log("db connected");
    
    app.listen(port, () => {
      console.log(`Todo app listening at ${host}:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });





