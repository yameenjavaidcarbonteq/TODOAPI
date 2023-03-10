const config = require('../../Infrastructure_Layer/config/index');
const Adapter = require('../../Infrastructure_Layer/database/useradapter');
const adapter = new Adapter(config.dbtype);
const User = require('../../Domain_Layer/entities/user');

const jwt = require("jsonwebtoken");

const sendToken = (request, response) => {
  const { id, email } = request.user;
  console.log("Making Token for id and email: ",id,email);
  const token = jwt.sign({ id, email}, config.jwtsecret, {
    expiresIn: 1200
  });

  
  response.json({ token: `Bearer ${token}` });
};


//UserData declaration on top
const authorization = async (payload, done) => {
  console.log("In Authorization Function");
  try{
    console.log(payload);  
    const foundedUser = await adapter.findOne({id: payload.id});
      done(null, foundedUser);
  }catch(error){
      done(error.null);
  }
};


module.exports = {
  sendToken,
  authorization
};











