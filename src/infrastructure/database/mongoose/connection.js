const logger from'../../logger');

function connection(mongoose, config, options) {
    function connectToMongo() {
        // mongoose.connect(`${mongoose_db.URI}/${mongoose_db.DB}`, { useNewUrlParser: true });
        mongoose
        .connect(config.mongoose.uri, options)
        .then(
          () => {},
          (err) => {
            logger.error('Mongodb error', err);
          }
        )
        .catch((err) => {
          logger.error('ERROR:', err);
        });
    }
  
    mongoose.connection.on('connected', () => {
      logger.info('Connected to MongoDB!');
    });
  
    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected!');
    });
  
    mongoose.connection.on('error', (error) => {
      logger.error(`Error in MongoDb connection: ${error}`);
      mongoose.disconnect();
    });
  
    mongoose.connection.on('disconnected', () => {
      logger.error(
        `MongoDB disconnected! Reconnecting in ${
          options.reconnectInterval / 1000
        }s...`
      );
      setTimeout(() => connectToMongo(), options.reconnectInterval);
    });
  
    return {
      connectToMongo
    };
  }
  
module.exports = connection;