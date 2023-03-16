import passport from 'passport';
import { JwtStrategy} from 'passport-jwt';

import {configJWT} from "./configStrategies";
import {authorization} from "@controllers/tokenController";

passport.use(new JwtStrategy(configJWT, authorization));


