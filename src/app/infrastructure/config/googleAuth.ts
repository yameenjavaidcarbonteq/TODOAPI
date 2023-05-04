require('dotenv').config();
export const googleAuth =  {
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  callbackURL: process.env.CALLBACKURL,
};