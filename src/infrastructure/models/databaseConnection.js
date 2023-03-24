const { config } = require("@config");
const mongoose = require("./mongooseModels/mongooseConnection");
const sequelize = require("./sequelizeModels/sequelizeConnection");
module.exports = () => {
  if (config.dbtype === "mongoose") {
    mongoose();
  }
  if (config.dbtype === "sequelize") {
    sequelize();
  }
}