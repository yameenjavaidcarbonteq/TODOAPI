const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const TodoRoutes = require('./http/routes/todo.routes');
const AuthRoutes = require('./http/routes/auth.routes');

const MongoDBClient = require('./infrastructure/mongoClient');






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

const client = new MongoDBClient('mongodb://localhost:27017', 'todoapi', 'todos');

// Use the router
// app.use('/', AuthRoutes);
app.use('/', new TodoRoutes(client.getAdapter()).createRoutes());


client.connect()
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Todo app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });





