const logger from'../.@infrastructure/logger');

const todoRepositoyMongoose from"./mongoose/mongooseRepositories/TodoRepositoryMongoose");
const todoRepositoySequelize from"./sequelize/sequelizeRepositories/TodoRepositorySequelize");

const repository from'@domain/Interfaces/TodoRepository');
// const { validate } from'./mongoose/mongooseModels/todo');
class adapter extends repository{

    constructor(repositoryType) {
        super();
        
        this.repository = null;
        if (repositoryType === 'mongoose') 
        {
          this.repository = new todoRepositoyMongoose();
        } 
        else if (repositoryType === 'sequelize') 
        {
          this.repository = new todoRepositoySequelize();
        }
    }

    async getPaginatedData(offset, limit) {
    
      try {
        return await this.repository.getPaginatedData(offset, limit);
      } catch (error) {
        logger.error(`Error getting Paginated Data: ${error.message}`);
        throw new Error(`Error getting Paginated Data: ${error.message}`);
      }
    }
    
    async find(query) {
        try {
          
          logger.info("Finding todos for query: ",query);
          return await this.repository.find(query);
        } catch (error) {
          logger.error(`Error finding todos: ${error}`);
          throw new Error(`Error finding todos: ${error}`);
        }
      }
      
      async countAll(query) {
        try {
          return await this.repository.countAll(query);
        } catch (error) {
          logger.error(`Error counting todos: ${error}`);
          throw new Error(`Error counting todos: ${error}`);
        }
      }
      
      async findOne(query) {
        try {
          return await this.repository.findOne(query);
        } catch (error) {
          logger.error(`Error finding todo: ${error}`);
          throw new Error(`Error finding todo: ${error}`);
        }
      }
      
      async create(todoItem) {
        try {
          await this.repository.validateTodo(todoItem);
          return await this.repository.create(todoItem);
        } catch (error) {
          logger.error(`Error creating todo: ${error}`);
          throw new Error(`Error creating todo: ${error}`);
        }
      }
      
      async updateById(id, todoItem) {
        try {
          return await this.repository.updateById(id, todoItem);
        } catch (error) {
          logger.error(`Error updating todo by id: ${error}`);
          throw new Error(`Error updating todo by id: ${error}`);
        }
      }
      
      async delete(id) {
        try {
          return await this.repository.delete(id);
        } catch (error) {
          logger.error(`Error deleting todo: ${error}`);
          throw new Error(`Error deleting todo: ${error}`);
        }
      }
}


module.exports = adapter;