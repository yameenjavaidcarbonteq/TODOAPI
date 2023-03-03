const express = require('express');
const mongoose = require('mongoose');
const config = require('./infrastructure/config/index');
const logger = require('./infrastructure/logger/index');
const expressConfig = require ('./http/express');
const expressSession = require('express-session');
const passport = require('passport');
const routes = require('./http/routes/index');
const serverConfig = require('./http/server');
const mongoDbConnection = require('./infrastructure/database/mongoose/connection');

mongoose.set('strictQuery', false);

// middlewares
const errorHandlingMiddleware = require ('./http/middlewares/errorHandlingMiddleware');

const app = express();

const server = require('http').createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useNewUrlParser: true,
  connectTimeoutMS: 1000
}).connectToMongo();


// error handling middleware
app.use(errorHandlingMiddleware);

app.use(express.json());
app.use(express.text());

// using session on app
app.use(expressSession({
  secret: config.sessionsecret,
  resave: false,
  saveUninitialized: true,
  maxAge: 24 * 60 * 60 * 1000,
}));

app.use(passport.initialize());
app.use(passport.session());

// routes for each endpoint
routes(app, express);

// Expose app
module.exports = app;