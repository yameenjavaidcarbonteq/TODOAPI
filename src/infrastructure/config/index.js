require('dotenv').config();

module.exports = {
  
    dbtype: process.env.DBTYPE,
    jwtsecret: process.env.JWTSECRET,
    host: process.env.HOST,
    port: process.env.PORT, 
    mongoose: require('./mongoose'),
    sequelize: require('./sequelize'),
    googleauth: require('./googleauth'),
};