import { errorHandler } from '@http';

import passport from 'passport';
import "@infrastructure/AuthService/passport/passportAuthentication";
import "@infrastructure/AuthService/passport/passportAuthorization";
import express from 'express';
import { routes } from '@http';
import { logger } from '@infrastructure';

const app = express();

logger.log("info","Initiating App");


app.use(express.json());
app.use(express.text());
app.use(passport.initialize());

routes(app);
app.use(errorHandler);

// Expose app
export default app;
