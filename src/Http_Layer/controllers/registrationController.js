const config = require('../../Infrastructure_Layer/config/index');
const Adapter = require('../../Infrastructure_Layer/database/useradapter');
const adapter = new Adapter(config.dbtype);
const User = require('../../Domain_Layer/entities/user');

//Create User Google 
const createNewUserGoogle = async profile => {
  console.log("Creating New User in database: ",profile)
  try {
    
    const username = profile.displayName;
    const googleId = profile.id;
    const email = profile.emails[0].value;
    
    const userEntity = User.create(User.makeid(), username, null, email, true, googleId, 'google');
    const newUser = await adapter.create(userEntity);
    return newUser;
  } catch (error) {
    return { error: error };
  }
};



// Create User Local
const createNewUserLocal = async (request, response, next) => {
  try {
    const {
      email,
      username,
      password,
    } = request.body;
    
    if (!password) {
      throw { message: "Please type all required data!", status: 400 };
    }
    if (await adapter.findOne({ email })) {
      throw { message: "This email address has been used", status: 400 };
    }
    const userEntity = User.create(User.makeid(), username, password, email, true, null, 'email');
    const createdUser = await adapter.create(userEntity);
    
    console.log(createdUser);
    
    request.user = {
      email: createdUser.email,
    };
    next();
  } catch (error) {
    response.status(error.status || 500).send(error.message);
  }
};

module.exports = {
  createNewUserLocal,
  createNewUserGoogle
};
