const Sequelize = require('sequelize');
const sequelize = new Sequelize('carbonteq_todo', 'root', '4675', {
  host: 'localhost',
  dialect: 'mysql'
});
const User = sequelize.define('Users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  googleID: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  displayName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});



// sequelize.sync({ force: true }).then(() => {
//   console.log('Tables created or updated');
// });

/*
    The sequelize.sync() method in Sequelize is used to create or update the database schema to match 
    the defined models. It ensures that the database tables and columns exist for the defined models 
    and that they match the structure defined in the models.

    The sync() method takes an optional configuration object that allows you to specify how the synchronization 
    should be performed. For example, you can use the force option to drop the existing tables and recreate them 
    from scratch, or you can use the alter option to modify the existing tables to match the models without 
    dropping them.

*/
module.exports = User;