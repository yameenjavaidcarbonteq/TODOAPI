const {config} = require ("@config");


const Sequelize = require ("sequelize");
const sequelize = new Sequelize(config.seq_database, config.seq_username, config.seq_password, {
  host: config.seq_host,
  dialect: config.seq_dialect
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




