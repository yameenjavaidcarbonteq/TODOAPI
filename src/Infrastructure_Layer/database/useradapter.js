const logger = require('../../Infrastructure_Layer/logger/index');

const userRepositoryMongoose = require("./mongoose/mongooseRepositories/userRepositoryMongoose");
const userRepositorySequelize = require("./sequelize/sequelizeRepositories/userRepositorySequelize");

const store = require('../../Domain_Layer/interfaces/storeInterfaceUser');
class adapter extends store{

    constructor(storeType) {
        
      super();
        
      this.store = null;
      if (storeType === 'mongoose') 
      {
        this.store = new userRepositoryMongoose();
      } 
      else if (storeType === 'sequelize') 
      {
        this.store = new userRepositorySequelize();
      }
    }

    
      
    async find() {
        try {
          return await this.store.find();
        } catch (error) {
          console.error(`Error finding items: ${error.message}`);
          throw new Error(`Error finding items: ${error.message}`);
        }
      }
      
      async findByProperty(params) {
        try {
          return await this.store.findByProperty(params);
        } catch (error) {
          console.error(`Error finding items by property: ${error.message}`);
          throw new Error(`Error finding items by property: ${error.message}`);
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
      
      async findOne(query) {
        try {
          return await this.store.findOne(query);
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
          return await this.store.update(userItem);
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