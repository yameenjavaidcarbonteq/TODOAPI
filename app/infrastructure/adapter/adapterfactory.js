const dotenv = require('dotenv');
dotenv.config();

const MongoDBAdapter = require('./mongoDBAdapter');
const SequelizeAdapter = require('./sequalizeAdapter');

class DatabaseAdapterFactory {
  static createAdapter(databaseType) {
    if (databaseType === 'mongodb') {
      const parameters = {
        url: process.env.MONGO_URI,
        collection: process.env.COLLECTION
      };
      console.log("Creating Mongo Adapter");
      return new MongoDBAdapter(parameters);
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
      return new SequelizeAdapter(parameters);
    } else {
      throw new Error('Unsupported database type');
    }
  }
}

module.exports = DatabaseAdapterFactory;