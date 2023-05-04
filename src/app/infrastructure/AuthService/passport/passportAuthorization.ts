import passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';


import { configJWT } from './configStrategies';
import { authorization } from './handlers';

passport.use(new JWTStrategy(configJWT, authorization));