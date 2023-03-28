require('module-alias/register');
const { logger } = require("@logger");
const { config } = require("@config");
const errorHandler = require('../middlewares/ErrorHandlingMiddleware');

const passport = require('passport');
require("../../infrastructure/passport/passportAuthentication");
require("../../infrastructure/passport/passportAuthorization");

const express = require('express');
const { expressConfig } = require('@http');

const { routes } = require('@http');

const databaseConnection = require("../../infrastructure/models/databaseConnection");

const app = express();

expressConfig(app);

databaseConnection();

app.use(express.json());
app.use(express.text());
app.use(passport.initialize());
routes(app, express);
app.use(errorHandler);
// Expose app
module.exports = app;
