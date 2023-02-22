const store = require('../../domain/userStore');
const dotenv = require('dotenv');
dotenv.config();

class UserController {

  constructor()
  {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.signup = this.signup.bind(this);
    
    this.store = new store(process.env.DB);
  }
  async login (req, res, next) 
  {
    passport.authenticate('local', {
      failureRedirect: false,  //because i don't have client side 
      successRedirect: '/',
      failureFlash: 'Invalid email or password',
    })(req, res, next);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
  }
  
  async logout (req, res, next) {
    console.log("Logout this User");
    // req.session.destroy(function (err) {
    //     res.redirect('/');
    // });
    req.logout(() => {
      // Callback function is called after the user's session is cleared
      res.json({'Message': 'Logged Out'});
    });
  }

  async signup (req, res) {
    try{
    const { username, email, password } = req.body;
    const exists = await this.store.findOne(email);
    if (exists) {
      res.status(200).json({ error: `User ${email} exists already` });
    }
    console.log("Creating new User: ",{ username, email, password });
    const newUser = await this.store.create(email, password, username, false, null, 'email');
    
    req.logIn(newUser, (err) => 
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
