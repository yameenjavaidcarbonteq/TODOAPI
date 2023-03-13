const service = require('../../Application_Layer/services/user');
const logger = require('../../Infrastructure_Layer/logger/index');
const bcrypt = require('bcrypt');


class AuthController {

  constructor(dbRepository)
  {
    
    this.logout = this.logout.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginLocal = this.loginLocal.bind(this);
    this.createNewUserGoogle = this.createNewUserGoogle.bind(this);
    this.createNewUserLocal = this.createNewUserLocal.bind(this);
    
    this.userService = new service(dbRepository);
  }
  
  async logout (req, res, next) {
    req.logout((err) => {
      if (err)
      {
        res.json({'Error': err});
      }
      res.json({'Message': 'Logged Out'});
    });
  }

  // Login Using Google passport
  async loginGoogle (accessToken, refreshToken, profile, done) {
    try {
      let query = {};
      query.email = profile.emails[0].value;
      let user = await this.userService.findOne(query);

      if (user) {
        done(null, user);
      } 
      else 
      {
        user = await this.createNewUserGoogle(profile);
        done(null, user);
      }
    } catch (error) {
      done(error, null);
    }
  }

  // Login Using Local passport
  async loginLocal (email, password, done) 
  {
    try 
    {
      let query = {};
      query.email = email;
      const user = await this.userService.findOne(query);
      
      logger.info("Finding User: ",user);
      
      if (user) 
      {
        if (user.password) 
        {
          (await bcrypt.compare(password, user.password))
            ? done(null, user)
            : done(null, null);
        } else
        done(null, false);
      } 
      else {
        done(null, false);
      }
    }
    catch (error) 
    {
      done(error, null);
    }
  }


  //Create User Google 
  async createNewUserGoogle (profile){
    try {
      
      const username = profile.displayName;
      const googleId = profile.id;
      const email = profile.emails[0].value;
      
      const createdUser = await this.userService.create(username, email, null, true, googleId, 'google');
      return createdUser;
    } catch (error) {
      return { error: error };
    }
  }

  async createNewUserLocal (request, response, next){
    try {
      const {
        email,
        username,
        password,
      } = request.body;
      
      if (!password) {
        throw { message: "Please type all required data!", status: 400 };
      }

      const createdUser = await this.userService.create(username, email, password, true, null, 'email');
      
      
      request.user = {
        id: createdUser.id,
        email: createdUser.email
      };
      next();
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  };
}
module.exports = AuthController;
