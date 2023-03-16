import ('module-alias/register');

import logger from '@logger';
import config from '@config';


import express from'express';
import mongoose from'mongoose';

import expressConfig from ('@http/express');
import passport from'passport';

//Just initializing
require("@http/passport/passportAuthentication");
require("@http/passport/passportAuthorization");

logger.info("Importing Passport Strategies");

import routes from'@http/routes';
import serverConfig from'@http/server';
import mongoDbConnection from'@infrastructure/database/mongoose/connection';


mongoose.set('strictQuery', false);

// middlewares
import errorHandlingMiddleware from '@http/middlewares/errorHandlingMiddleware';

const app = express();
logger.info("Setting up Express APP");

// import server from 
import { createServer } from 'http';
const server = createServer(app);
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