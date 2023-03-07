const express = require('express');
const mongoose = require('mongoose');
const config = require('./infrastructure/config/index');
const logger = require('./infrastructure/logger/index');
const expressConfig = require ('./http/express');
const passport = require('passport');

//Just initializing
require("./http/passport/passportAuthentication");
require("./http/passport/passportAuthorization");

console.log("------------ Importing Passport Strategies");

const routes = require('./http/routes/index');
const serverConfig = require('./http/server');
const mongoDbConnection = require('./infrastructure/database/mongoose/connection');

mongoose.set('strictQuery', false);

// middlewares
const errorHandlingMiddleware = require ('./http/middlewares/errorHandlingMiddleware');

const app = express();
console.log("------------ Setting up Express APP");

const server = require('http').createServer(app);
console.log("------------ Creating Server");

// express.js configuration (middlewares etc.)
expressConfig(app);
console.log("------------ Setting up Express Config");

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();
console.log("------------ Setting up Server Config");
// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useNewUrlParser: true,
  connectTimeoutMS: 1000
}).connectToMongo();
console.log("------------ Setting up Mongo DB");

// error handling middleware
app.use(errorHandlingMiddleware);

app.use(express.json());
app.use(express.text());

app.use(passport.initialize());
// app.use(passport.session());

// routes for each endpoint
routes(app, express);
console.log("------------ Setting up Routes");

// Expose app
module.exports = app;