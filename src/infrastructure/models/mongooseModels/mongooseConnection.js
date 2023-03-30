const mongoose = require("mongoose");
const { logger } = require("@logger");
const { database } = require("@config");
module.exports = function () {
  mongoose.set('strictQuery', false);
  mongoose.connect("mongodb://localhost:27017/todoapi");

  mongoose.connection.on("connected", function () {
    logger.info(`Mongoose default connection is open to ${database.uri}`);
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
