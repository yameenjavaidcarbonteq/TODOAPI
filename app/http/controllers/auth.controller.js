const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user.model');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    user.password = await bcrypt.hash(user.password, 8);
    await user.save();
    req.session.user = user;
    res.status(200).send({ auth: true });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    
    console.log(username,password);
    try 
    {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).send('No user found');
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) 
          return res.status(401).send('Invalid password');
      req.session.user = user;
      res.status(200).send({ auth: true});
    } 
    catch (error) 
    {
      res.status(500).send(error.message);
    }
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send({ logout: true});
      });
    
};

module.exports = {
    register,
    login,
    logout
};