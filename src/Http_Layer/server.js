const { createTerminus } = require('@godaddy/terminus');
const logger = require('../Infrastructure_Layer/logger/index');

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
      console.error(`Health Check Error: ${error.message}`);
      throw new Error(`Health Check Error: ${error.message}`);
    }
  }
  
  async function onSignal() {
    console.info('server is starting cleanup');
    try {
      await mongoose.disconnect(false);
      console.info('Mongoose has disconnected');
    } catch (error) {
      console.error(`Error on signal: ${error.message}`);
      throw new Error(`Error on signal: ${error.message}`);
    }
  }
  
  async function beforeShutdown() {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 15000);
      });
    } catch (error) {
      console.error(`Error before shutdown: ${error.message}`);
      throw new Error(`Error before shutdown: ${error.message}`);
    }
  }
  
  function onShutdown() {
    console.info('cleanup finished, server is shutting down');
  }
  
  async function startServer() {
    try {
      await createTerminus(serverInit, {
        logger: console.info,
        signal: 'SIGINT',
        healthChecks: {
          'healthcheck': healthCheck,
        },
        onSignal,
        onShutdown,
        beforeShutdown,
      }).listen(config.port);
      console.info(`Express server listening on ${config.port}`, );
    } catch (error) {
      console.error(`Error starting server: ${error.message}`);
      throw new Error(`Error starting server: ${error.message}`);
    }
  }
  

  return {
    startServer,
  };
}

module.exports = serverConfig;