const config = {
  ...require ('./application'),
  ...require ('./database'),
  ...require ('./mongoose'),
  ...require ('./sequelize'),
  ...require ('./googleauth')
};

module.exports = { config };
