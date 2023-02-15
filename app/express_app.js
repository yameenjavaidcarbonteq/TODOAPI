const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const TodoRoutes = require('./http/routes/todo.routes');
const AuthRoutes = require('./http/routes/auth.routes');

const MongoDBClient = require('./infrastructure/mongoClient');




const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

const mongo_uri = process.env.MONGO_URI;

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

const client = new MongoDBClient(mongo_uri, 'todoapi', 'todos');

// Use the router
// app.use('/', AuthRoutes);




client.connect()
  .then(() => {
    console.log("db connected");
    
    console.log(client.getAdapter());
    app.use('/', new TodoRoutes(client.getAdapter()).createRoutes());
    
    app.listen(PORT, () => {
      console.log(`Todo app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
  });





