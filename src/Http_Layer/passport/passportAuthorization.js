const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;

const configToken = require("./configStrategies");
const authorization = require("../controllers/tokenController");

passport.use(new JWTStrategy(configToken.configJWT, authorization));

// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const config = require('../../Infrastructure_Layer/config/index');
// const Adapter = require('../../Infrastructure_Layer/database/useradapter');
// const adapter = new Adapter(config.dbtype);


// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.jwtsecret
// };
// passport.use(
//   new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      
//       console.log("Using This Streategy when required");

//       let user = await adapter.findOne({
//         id: jwt_payload.id
//       });
      
//       if (user) {
//         return done(null, user);
//       }
//       console.log("Using This Streategy when required");
//       return done(null, false);
//       })
//   );
