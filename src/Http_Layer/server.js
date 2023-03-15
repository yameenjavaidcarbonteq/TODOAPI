const { createTerminus } = require('@godaddy/terminus');
const logger = require('../Infrastructure_Layer/logger');

function serverConfig(app, mongoose, serverInit, config) {
  async function healthCheck() {
    try {
       ERR_CONNECTING_TO_MONGO
      if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
        throw new Error('Mongoose has disconnected');
      }
       CONNECTING_TO_MONGO
      if (mongoose.connection.readyState === 2) {
        throw new Error('Mongoose is connecting');
      }
       CONNECTED_TO_MONGO
      return Promise.resolve();
    } catch (error) {
      logger.error(`Health Check Error: ${error.message}`);
      throw new Error(`Health Check Error: ${error.message}`);
    }
  }
  
  async function onSignal() {
    logger.info('server is starting cleanup');
    try {
      await mongoose.disconnect(false);
      logger.info('Mongoose has disconnected');
    } catch (error) {
      logger.error(`Error on signal: ${error.message}`);
      throw new Error(`Error on signal: ${error.message}`);
    }
  }
  
  async function beforeShutdown() {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 15000);
      });
    } catch (error) {
      logger.error(`Error before shutdown: ${error.message}`);
      throw new Error(`Error before shutdown: ${error.message}`);
    }
  }
  
  function onShutdown() {
    logger.info('cleanup finished, server is shutting down');
  }
  
  async function startServer() {
    try {
      await createTerminus(serverInit, {
        logger: logger.info,
        signal: 'SIGINT',
        healthChecks: {
          'healthcheck': healthCheck,
        },
        onSignal,
        onShutdown,
        beforeShutdown,
      }).listen(config.port);
      logger.info(`Express server listening on ${config.port}`, );
    } catch (error) {
      logger.error(`Error starting server: ${error.message}`);
      throw new Error(`Error starting server: ${error.message}`);
    }
  }
  

  return {
    startServer,
  };
}

module.exports = serverConfig;