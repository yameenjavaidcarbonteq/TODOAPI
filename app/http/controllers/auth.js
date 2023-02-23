const config = require('../../infrastructure/config/index');

const { v4: uuidv4 } = require('uuid');
const User = require('../../domain/entities/user');

const passport = require('passport');
const adapter = require('../../infrastructure/user/useradapter');

class UserController {

  constructor()
  {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    
    this.store = new adapter(config.dbtype);
  }
  async login (req, res, next) 
  {
    console.log('req: ',req.body);
    passport.authenticate('local', {
      failureRedirect: false, 
      successRedirect: '/',
      failureFlash: 'Invalid email or password',
    })(req, res, next);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  }
  
  async logout (req, res, next) {
    console.log("Logout this User");
    req.logout(() => {
      // Callback function is called after the user's session is cleared
      res.json({'Message': 'Logged Out'});
    });
  }

  async signup (req, res, next) {
    try{
    const { username, email, password } = req.body;
    const exists = await this.store.findOne({"email": email});
    if (exists) {
      res.status(200).json({ error: `User ${email} exists already` });
    }
    const userEntity = User.create(User.makeid(), username, password, email, false, null, 'email');
    await this.store.create(userEntity);
    req.logIn(userEntity, (err) => 
    {
        if (err)
        {
          return next(err);
        }
        return res.redirect('/');
    });
    }catch (error) 
    {
      res.status(500).send(error.message);
    }
  }
}
module.exports = UserController;
