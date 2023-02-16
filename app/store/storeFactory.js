const dotenv = require('dotenv');
dotenv.config();

const mongoStore = require('./mongoStore');
const sequelizeStore = require('./sequelizeStore');

class StoreFactory {
  static createStore(storeType) {
    if (storeType === 'mongodb') {
      
      console.log("Creating Mongo Adapter");
      return new mongoStore();
    } else if (databaseType === 'sequelize') {
      
      console.log("Creating sequelize Adapter");
      return new sequelizeStore();
    } else {
      throw new Error('Unsupported database type');
    }
  }
}

module.exports = StoreFactory;