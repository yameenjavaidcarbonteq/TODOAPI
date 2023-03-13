const express = require('express');
const mongoose = require('mongoose');
const config = require('./Infrastructure_Layer/config/index');
const logger = require('./Infrastructure_Layer/logger/index');
const expressConfig = require ('./Http_Layer/express');
const passport = require('passport');

//Just initializing
require("./Http_Layer/passport/passportAuthentication");
require("./Http_Layer/passport/passportAuthorization");

logger.info("Importing Passport Strategies");

const routes = require('./Http_Layer/routes/index');
const serverConfig = require('./Http_Layer/server');
const mongoDbConnection = require('./Infrastructure_Layer/database/mongoose/connection');

mongoose.set('strictQuery', false);

// middlewares
const errorHandlingMiddleware = require ('./Http_Layer/middlewares/errorHandlingMiddleware');

const app = express();
logger.info("Setting up Express APP");

const server = require('http').createServer(app);
logger.info("Creating Server");

// express.js configuration (middlewares etc.)
expressConfig(app);
logger.info("Setting up Express Config");

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();
logger.info("Setting up Server Config");
// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useNewUrlParser: true,
  connectTimeoutMS: 1000
}).connectToMongo();
logger.info("Setting up Mongo DB");

// error handling middleware
app.use(errorHandlingMiddleware);



app.use(express.json());
app.use(express.text());

app.use(passport.initialize());




// routes for each endpoint

app.use(async (req, res, next) => {
  try {
    await next(); // pass control to the next middleware/route
  } catch (err) {
    logger.error(err); // log the error for debugging purposes
    res.status(500).send("Internal server error"); // send a generic error response
  }
});
routes(app, express);
logger.info("Setting up Routes");

// Expose app
module.exports = app;