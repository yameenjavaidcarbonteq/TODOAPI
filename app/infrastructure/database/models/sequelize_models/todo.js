const config = require('../../infrastructure/config/index');
const db = config.sequelize;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect
});
const Todo = sequelize.define('Todos', {
  
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

// sequelize.sync({ force: true }).then(() => {
//   console.log('Tables created or updated');
// });

module.exports = Todo;


