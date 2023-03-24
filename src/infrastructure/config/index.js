const dotenv = require  ('dotenv');
dotenv.config();

const config = {
  dbtype: process.env.DBTYPE,
  jwtsecret: process.env.JWTSECRET,
  host: process.env.HOST,
  port: process.env.PORT,
  ...require ('./mongoose'),
  ...require ('./sequelize'),
  ...require ('./googleauth')
};

module.exports = {
  config
};
