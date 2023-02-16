const dotenv = require('dotenv');
dotenv.config();

const mongoStore = require('./mongoStore');
const sequalizeStore = require('./sequalizeStore');

class StoreFactory {
  static createStore(storeType) {
    if (storeType === 'mongodb') {
      const parameters = {
        url: process.env.MONGO_URI,
        collection: process.env.COLLECTION
      };
      console.log("Creating Mongo Adapter");
      return new mongoStore(parameters);
    } else if (databaseType === 'sequelize') {
      const parameters = {
        database: process.env.DB,
        username: process.env.SEQ_USERNAME,
        password: process.env.SEQ_PASSWORD,
        dialect: process.env.SEQ_dialect,
        host: process.env.SEQ_HOST,
        port: process.env.SEQ_PORT,
        options: ''
      };
      console.log("Creating Sequalize Adapter");
      return new sequalizeStore(parameters);
    } else {
      throw new Error('Unsupported database type');
    }
  }
}

module.exports = StoreFactory;