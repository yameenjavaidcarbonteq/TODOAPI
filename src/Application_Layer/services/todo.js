const logger = require('../../Infrastructure_Layer/logger');
const adapter = require('../../Infrastructure_Layer/database/todoadapter');
const Todo = require('../../Domain_Layer/entities/todo');

class todoService{

    constructor(todoRepository) {
        //services have adapter
      this.todoRepository = todoRepository;
    }

    async countAll(query) {
        try {
          return await this.todoRepository.countAll(query);
        } catch (error) {
          logger.error(`Error counting items: ${error.message}`);
          throw new Error(`Error counting items: ${error.message}`);
        }
      }
      
      // Pagination
      async getPaginatedData(offset, limit) {

        try {
          return await this.todoRepository.getPaginatedData(offset, limit);
        } catch (error) {
          logger.error(`Error getting Paginated Data: ${error.message}`);
          throw new Error(`Error getting Paginated Data: ${error.message}`);
        }
      }

      async create(title, description, status, userId) {
        try {
          
          
          if (!title || !description) {
            throw new Error('title and description fields cannot be empty');
          }
          
          const todoItem = Todo.create(Todo.makeid(), title, description, status, userId);
          await this.todoRepository.create(todoItem);
        } catch (error) {
          logger.error(`Error creating item: ${error.message}`);
          throw new Error(`Failed to add todo: ${error.message}`);
        }
      }
      
      async find(query) {
        try {
          
          return await this.todoRepository.find(query);
          
        } catch (error) {
          logger.error(`Error finding items: ${error.message}`);
          throw new Error(`Error finding items: ${error.message}`);
        }
      }
      
      async findOne(query) {
        try {
          return await this.todoRepository.findOne({query});
        } catch (error) {
          logger.error(`Error finding item: ${error.message}`);
          throw new Error(`Error finding item: ${error.message}`);
        }
      }
      
      async findbyid(id) {
        try {
          return await this.todoRepository.findbyid({id});
        } catch (error) {
          logger.error(`Error finding item by id: ${error.message}`);
          throw new Error(`Error finding item by id: ${error.message}`);
        }
      }
      
      async update(id, userId, title, description, status) {
        try {
          
          if (!title || !description) {
            throw new Error('title and description fields are mandatory');
          }
          
          const foundTodo = await this.todoRepository.findOne({id});
          if (!foundTodo) {
            throw new Error(`No post found with id: ${id}`);
          }
          logger.info(foundTodo);
          const updatedTodo = Todo.create(foundTodo.id, title, description, status, userId);
          
          return await this.todoRepository.updateById(foundTodo._id, updatedTodo);
        } catch (error) {
          logger.error(`Error updating item by id: ${error.message}`);
          throw new Error(`Error updating item by id: ${error.message}`);
        }
      }
      
      async delete(id) {
        try {
          const todo = await this.todoRepository.findOne({id});
          if (!todo) {
            throw new Error(`No post found with id: ${id}`);
          }
          return await this.todoRepository.delete(todo._id);
        } catch (error) {
          logger.error(`Error deleting item: ${error.message}`);
          throw new Error(`Error deleting item: ${error.message}`);
        }
      }
      
}


module.exports = todoService;