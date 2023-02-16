
const { Sequelize, DataTypes } = require('sequelize');
const db = require('./store');


class sequelizeAdapter extends db {
    constructor(parameters) {
      super();
      this.sequelize = null;
      this.database = parameters;
      this.username = parameters.username;
      this.password = parameters.password;
      this.host = parameters.host;
      this.dialect = parameters.dialect;  
      
      this.options = {
        host: this.host,
        dialect: this.dialect
      }
    
    }

    async connect() {
      this.sequelize = new Sequelize(this.database, this.username, this.password, this.options);
      await this.sequelize.authenticate();
    }
  
    async disconnect() {
      await this.sequelize.close();
    }
  
    async find(model) {
      
      const Model = this.sequelize.define(model, {});
      const result = await Model.findAll({ where: query });
      return result;
    }
  
    async findById(model, id) {
      return await this.collection.findOne({ _id: id });
    }
  
    async insert(model, data) {
      const Model = this.sequelize.define(model, {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ...data,
      });
      const result = await Model.create(data);
      return result.id;
    }
  
    async update(model, query, data) {
      const Model = this.sequelize.define(model, {});
      const result = await Model.update(data, { where: query });
      return result[0];
    }
  
    async delete(model, query) {
      const Model = this.sequelize.define(model, {});
      const result = await Model.destroy({ where: query });
      return result;
    }
  }
  
module.exports = sequelizeAdapter;
