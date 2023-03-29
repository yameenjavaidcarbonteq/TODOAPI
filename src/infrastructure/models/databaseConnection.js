const { database } = require("@config");
const mongoose = require("./mongooseModels/mongooseConnection");
const sequelize = require("./sequelizeModels/sequelizeConnection");
module.exports = () => {
  if (database.dbtype === "mongoose") {
    mongoose();
  }
  if (database.dbtype === "sequelize") {
    sequelize();
  }
}