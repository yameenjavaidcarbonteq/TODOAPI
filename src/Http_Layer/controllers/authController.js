const service = require('../../Application_Layer/services/user');
const config = require('../../Infrastructure_Layer/config/index');
const logger = require('../../Infrastructure_Layer/logger/index');

const loginController = require('./loginController');
const registrationController = require('./registrationController');
const tokenController = require('./tokenController');
const userController = require('./userController');

class AuthController {

  constructor()
  {
    
    this.logout = this.logout.bind(this);
    this.loginController = loginController;
    this.registrationController = registrationController;
    this.tokenController = tokenController;
    this.userController = userController;

    this.service = new service(config.dbtype);
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

  
}
module.exports = AuthController;
