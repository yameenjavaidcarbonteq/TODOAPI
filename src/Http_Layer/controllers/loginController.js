const { createNewUserGoogle } = require("./registrationController");
const config = require('../../Infrastructure_Layer/config/index');
const Adapter = require('../../Infrastructure_Layer/database/useradapter');
const adapter = new Adapter(config.dbtype);
const User = require('../../Domain_Layer/entities/user');


// Login Using Google
const loginGoogle = async (accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    let user = await adapter.findOne({
      email: profile.emails[0].value
    });

    console.log(user);
    
    if (user) {
      done(null, user);
    } else {
      user = await createNewUserGoogle(profile);
      console.log("Created this User: ",user);
      done(null, user);
    }
  } catch (error) {
    done(error, null);
  }
};

// Login Using Local
const loginLocal = async (email, password, done) => {
  try {
    const user = await adapter.findOne({ email });
    if (user) {
      // if (user.password) {
      //   (await bcrypt.compare(password, user.password))
      //     ? done(null, user)
      //     : done(null, null);
      done(null, user);  
    }
      // done(null, false);
     else {
      done(null, false);
    }
  } catch (error) {
    done(error, null);
  }
};

module.exports = {
  loginGoogle,
  loginLocal
};
