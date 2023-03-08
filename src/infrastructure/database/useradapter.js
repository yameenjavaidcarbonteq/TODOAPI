const logger = require('../../infrastructure/logger/index');

const usermongoStore = require("./mongoose/mongooseStore/usermongoStore");
const usersequelizeStore = require("./sequelize/sequelizeStore/usersequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceUser');
class adapter extends store{

  constructor(storeType) {
      
    super();
      
    this.store = null;
    if (storeType === 'mongoose') 
    {
        this.store = new usermongoStore();
    } 
    else if (storeType === 'sequelize') 
    {
        this.store = new usersequelizeStore();
    }
  }

  
    
  async find(params) {
    try {
      return await this.store.find(params);
    } catch (error) {
      console.error(`Error finding items: ${error.message}`);
      throw new Error(`Error finding items: ${error.message}`);
    }
  }
  async countAll(params) {
    try {
      return await this.store.countAll(params);
    } catch (error) {
      console.error(`Error counting items: ${error.message}`);
      throw new Error(`Error counting items: ${error.message}`);
    }
  }
  
  async findOne(params) {
    try {
      return await this.store.findOne(params);
    } catch (error) {
      console.error(`Error finding item: ${error.message}`);
      throw new Error(`Error finding item: ${error.message}`);
    }
  }
  
  async findbyid(id) {
    try {
      return await this.store.findbyid(id);
    } catch (error) {
      console.error(`Error finding item by id: ${error.message}`);
      throw new Error(`Error finding item by id: ${error.message}`);
    }
  }
  
  async create(userItem) {
    try {
      
      return await this.store.create(userItem);
    } catch (error) {
      console.error(`Error creating item: ${error.message}`);
      throw new Error(`Error creating item: ${error.message}`);
    }
  }
  
  async updateById(id, userItem) {
    try {
      return await this.store.updateById(id, userItem);
    } catch (error) {
      console.error(`Error updating item by id: ${error.message}`);
      throw new Error(`Error updating item by id: ${error.message}`);
    }
  }
  
  async delete(id) {
    try {
      return await this.store.delete(id);
    } catch (error) {
      console.error(`Error deleting item: ${error.message}`);
      throw new Error(`Error deleting item: ${error.message}`);
    }
  }
    
}
      



module.exports = adapter;