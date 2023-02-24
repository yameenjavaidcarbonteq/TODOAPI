
const config = require('./infrastructure/config/index');
const mongoose_db = config.mongoose;
const sessionsecret = config.sessionsecret;
const host = config.host;
const port = config.port;

const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const expressSession = require('express-session');


const TodoRoutes = require('./http/routes/todo');
const AuthRoutes = require('./http/routes/auth');


const app = express();
app.use(express.json());
app.use(express.text());
app.use(bodyParser.urlencoded({ extended: true }));




app.use(expressSession({
    secret: sessionsecret,
    resave: false,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// app.use(function (req, res, next) {
//     res.locals.success_messages = req.flash('success_messages');
//     res.locals.error_messages = req.flash('error_messages');
//     res.locals.error = req.flash('error');
//     next();
// });


// .............................................................

// Use the router
app.use('/', AuthRoutes);
app.use('/', TodoRoutes);




const mongoose = require('mongoose');
mongoose.connect(`${mongoose_db.URI}/${mongoose_db.DB}`, { useNewUrlParser: true });


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
