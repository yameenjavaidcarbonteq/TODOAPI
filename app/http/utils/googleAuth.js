var GoogleStrategy = require('passport-google-oauth20').Strategy;
const Store = require('../../domain/userStore');
const store = new Store("mongoose");

module.exports = function (passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.REDIRECTURI
    }, 
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile.emails[0].value);
        const email = profile.emails[0].value;
        console.log("Searching this Email: ",email);
        const exists = await store.findOne(email);
        console.log("Results for Exists: ",exists);
        if (exists) {
            console.log("User Found");
            console.log(exists);
            return done(null, exists);
        }
        else {
            // create a user
            const newUser = await store.create(
                profile.emails[0].value,
                null,
                profile.displayName, 
                true,                 
                profile.id,
                'google'
                );
    
            return done(null, newUser);
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