const Sequelize = require('sequelize');

const sequelize = new Sequelize('carbonteq_todo', 'root', '4675', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;