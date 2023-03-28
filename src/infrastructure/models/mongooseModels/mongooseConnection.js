const mongoose = require("mongoose");
const {logger} = require("@logger");
const { config } = require("@config");
//this function and imported by server.js
module.exports = function () {
  mongoose.set('strictQuery', false);
  mongoose.connect(config.uri);

  mongoose.connection.on("connected", function () {
    logger.info(`Mongoose default connection is open to ${config.uri}`);
  });

  mongoose.connection.on("error", function (err) {
    logger.error(`Mongoose default connection has occurred ${err} error`);
  });

  mongoose.connection.on("disconnected", function () {
    logger.info("Mongoose default connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
module.exports.mongoose = mongoose;
