const logger from'../.@infrastructure/logger');

const userRepositoryMongoose from"./mongoose/mongooseRepositories/UserRepositoryMongoose");
const userRepositorySequelize from"./sequelize/sequelizeRepositories/UserRepositorySequelize");

const repository from'@domain/interfaces/UserRepository');
class adapter extends repository{

  constructor(repositoryType) {
    super();
    this.repository = null;
    if (repositoryType === 'mongoose') 
    {
      this.repository = new userRepositoryMongoose();
    } 
    else if (repositoryType === 'sequelize') 
    {
      this.repository = new userRepositorySequelize();
    }
  }

  async find(query) {
    try {
      return await this.repository.find(query);
    } catch (error) {
      logger.error(`Error finding items: ${error.message}`);
      throw new Error(`Error finding items: ${error.message}`);
    }
  }
    
  async findOne(query) {
    try {
      return await this.repository.findOne(query);
    } catch (error) {
      logger.error(`Error finding item: ${error.message}`);
      throw new Error(`Error finding item: ${error.message}`);
    }
  }
  
  async create(userItem) {
    try {
      
      return await this.repository.create(userItem);
    } catch (error) {
      logger.error(`Error creating item: ${error.message}`);
      throw new Error(`Error creating item: ${error.message}`);
    }
  }
    
  async updateById(id, userItem) {
    try {
      return await this.repository.update(userItem);
    } catch (error) {
      logger.error(`Error updating item by id: ${error.message}`);
      throw new Error(`Error updating item by id: ${error.message}`);
    }
  }
  
  async delete(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      logger.error(`Error deleting item: ${error.message}`);
      throw new Error(`Error deleting item: ${error.message}`);
    }
  }
}
      



module.exports = adapter;