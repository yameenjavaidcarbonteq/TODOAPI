const { database } = require ("@config");

const Sequelize = require ("sequelize");
const sequelize = new Sequelize(database.database, database.username, database.password, {
  host: database.host,
  dialect: database.dialect
});
const TodoModelSequelize = sequelize.define('Todos', {
  
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  done: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
}, {
  timestamps: false
});

//  sequelize.sync({ force: true }).then(() => {
//    logger.info('Tables created or updated');
//  });

module.exports = {
  TodoModelSequelize
};  




