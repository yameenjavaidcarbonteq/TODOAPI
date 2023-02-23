var localStrategy = require('passport-local').Strategy;
const config = require('../../infrastructure/config/index');
const adapter = require('../../infrastructure/user/useradapter');
const store = new adapter(config.dbtype);

module.exports = function (passport) {
    passport.use(new localStrategy({ 
        usernameField: 'email',
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
        console.log("serializing this user in Passport Local: ",user);
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        console.log("deserializing: ",id);
        const exists = await store.findbyid({"id": id});
        if (exists) {
            console.log("deserializing this user in Passport Local: ",exists);
            done(null, exists);
        }
    });

}


/*
    Notes:
        The error parameter is an optional error object that 
        is passed to done if an error occurred during authentication. 
        If there was no error, error is null.

        The user parameter is an optional user object that is passed 
        to done if authentication was successful. The user object typically 
        contains information about the authenticated user, such as their username, email, and/or other profile information.

        The info parameter is an optional object that contains additional 
        information about the authentication process. This can be used to 
        pass messages or additional data about the authentication result to 
        downstream middleware or route handlers.
*/