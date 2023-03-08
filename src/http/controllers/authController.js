const service = require('../../app/services/user');
const config = require('../../infrastructure/config/index');
const logger = require('../../infrastructure/logger/index');
class AuthController {

  constructor()
  {
    
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    
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

  async signup (req, res, next) {
    try{
    const { username, password, email } = req.body;
    const userEntity = await this.service.create( username, email, password );
    req.login(userEntity, (err) => 
    {
      if (err)
      {
        return next(err);
      }
      res.redirect('/auth/todos');
    });
    } catch (error) 
    {
      res.status(500).send(error.message);
    }
  }
}
module.exports = AuthController;
