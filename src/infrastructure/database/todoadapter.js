const logger = require('../../infrastructure/logger/index');

const todomongoStore = require("./mongoose/mongooseStore/todomongoStore");
const todosequelizeStore = require("./sequelize/sequelizeStore/todosequelizeStore");

const store = require('../../domain/interfaces/storeInterfaceTodo');

class adapter extends store{

  constructor(storeType) {
    super();
    
    this.store = null;
    if (storeType === 'mongoose') 
    {
        //currently changing store to repository
        this.store = new todomongoStore();
    } 
    else if (storeType === 'sequelize') 
    {
        this.store = new todosequelizeStore();
    }
  }

  async getPaginatedData(offset, limit) {
    
    try {
      return await this.store.getPaginatedData(offset, limit);
    } catch (error) {
      console.error(`Error getting Paginated Data: ${error.message}`);
      throw new Error(`Error getting Paginated Data: ${error.message}`);
    }
  }


  async find(params) {
    try {
      return await this.store.find(params);
    } catch (error) {
      console.error(`Error finding todos: ${error}`);
      throw new Error(`Error finding todos: ${error}`);
    }
  }
  
  async countAll(params) {
    try {
      return await this.store.countAll(params);
    } catch (error) {
      console.error(`Error counting todos: ${error}`);
      throw new Error(`Error counting todos: ${error}`);
    }
  }
  
  async findOne(params) {
    try {
      return await this.store.findOne(params);
    } catch (error) {
      console.error(`Error finding todo: ${error}`);
      throw new Error(`Error finding todo: ${error}`);
    }
  }
  
  async findbyid(id) {
    try {
      return await this.store.findbyid(id);
    } catch (error) {
      console.error(`Error finding todo by id: ${error}`);
      throw new Error(`Error finding todo by id: ${error}`);
    }
  }
  
  async create(todoItem) {
    try {
      await this.store.validateTodo(todoItem);
      return await this.store.create(todoItem);
    } catch (error) {
      console.error(`Error creating todo: ${error}`);
      throw new Error(`Error creating todo: ${error}`);
    }
  }
  
  async updateById(id, todoItem) {
    try {
      return await this.store.updateById(id, todoItem);
    } catch (error) {
      console.error(`Error updating todo by id: ${error}`);
      throw new Error(`Error updating todo by id: ${error}`);
    }
  }
  
  async delete(id) {
    try {
      return await this.store.delete(id);
    } catch (error) {
      console.error(`Error deleting todo: ${error}`);
      throw new Error(`Error deleting todo: ${error}`);
    }
  }
}


module.exports = adapter;