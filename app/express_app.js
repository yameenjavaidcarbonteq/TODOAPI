const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const csrf = require('csurf');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const MemoryStore = require('memorystore')(expressSession)


const TodoRoutes = require('./http/routes/todo');
const AuthRoutes = require('./http/routes/auth');


const host = process.env.HOST;
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(expressSession({
    secret: process.env.SESSIONSECRET,
    resave: true,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000,
    store: new MemoryStore(),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function (req, res, next) {
    res.locals.success_messages = req.flash('success_messages');
    res.locals.error_messages = req.flash('error_messages');
    res.locals.error = req.flash('error');
    next();
});


// .............................................................

// Use the router
app.use('/', AuthRoutes);
app.use('/', TodoRoutes);




const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todoapi', { useNewUrlParser: true });


app.listen(port, () => {
  console.log(`Todo app listening at ${host}:${port}`);
});






















// app.use(cookieParser('random'));
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
