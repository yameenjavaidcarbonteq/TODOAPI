const User = require('../../domain/entities/user');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const config = require('../../infrastructure/config/index');
const googleauth = config.googleauth;


const adapter = require('../../infrastructure/user/useradapter');
const store = new adapter(config.dbtype);




module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: googleauth.clientID,
        clientSecret: googleauth.clientSecret,
        callbackURL: googleauth.callbackURL
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const username = profile.displayName;
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const exists = await store.findOne({'email':email});
        console.log("Results for Exists: ",exists);
        if (exists) {
            console.log("User Found");
            console.log(exists);
            return done(null, exists);
        }
        else {
            // create a user
            const userEntity = User.create(User.makeid(),username, null, email, true, googleId, 'google');
            console.log(userEntity);
            await store.create(userEntity);
            return done(null, userEntity);
        }}
    ));
    passport.serializeUser(function (user, done) {
        console.log("Serializing this user: ",user);
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        console.log("deserializing: ",id);
        const exists = await store.findbyid(id);
        if (exists) {
            console.log("deserializing this user in Google Auth: ",exists);
            done(err, exists);
        }
    });

}