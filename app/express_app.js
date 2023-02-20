const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const TodoRoutes = require('./http/routes/todo.routes');
const AuthRoutes = require('./http/routes/auth.routes');

const host = process.env.HOST;
const port = process.env.PORT;

console.log("..........................");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000, // 30 minutes
    },
  }));

// Use the router

app.use('/', AuthRoutes);
app.use('/', TodoRoutes);


// let sequelize;

// if (process.env.DB === 'mongo') {
//   mongoose.connect('mongodb://localhost/myapp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }
// else if (process.env.DB === 'sequelize') {
//   sequelize = new Sequelize('sqlite::memory:');
//   (async () => {
//     await sequelize.authenticate();
//     console.log('Connected to SQLite');
//   })();
// }

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapi', { useNewUrlParser: true });


app.listen(port, () => {
  console.log(`Todo app listening at ${host}:${port}`);
});






