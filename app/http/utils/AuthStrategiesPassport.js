const config = require('../../infrastructure/config/index');


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const googleauth = config.googleauth;


const adapter = require('../../infrastructure/user/useradapter');
const store = new adapter(config.dbtype);
const User = require('../../domain/entities/user');


passport.use(new GoogleStrategy({
        clientID: googleauth.clientID,
        clientSecret: googleauth.clientSecret,
        callbackURL: googleauth.callbackURL
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const username = profile.displayName;
        const googleId = profile.id;
        const email = profile.emails[0].value;
        let exists = await store.findOne({'email':email});
        if (exists) 
        {
            return done(null, exists);
        }
        else 
        {
            const userEntity = User.create(User.makeid(),username, null, email, true, googleId, 'google');
            await store.create(userEntity);
            exists = await store.findOne({'email':email});
            return done(null, exists);
        }
    }));
    

passport.use(new LocalStrategy({ 
    emailField: 'email',
    passwordField: 'password'
},
async (email, password, done) => 
{
    try 
    {
        const exists = await store.findOne({'email': email});
        console.log(exists);
        if (!exists) {
            return done(null, false, { message: "User Doesn't Exist !"});
        }
        
        if (!exists.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password' });
        }
        return done(null, exists);
    } 
    catch (err) 
    {
        return done(err);
    }
}));


passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    console.log("Deserializing this Id: ",id);
    const exists = await store.findOne({'id': id});
    if (exists) {
        done(null, exists);
    }
});