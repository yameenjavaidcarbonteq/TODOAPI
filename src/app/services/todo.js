const logger = require('../../infrastructure/logger/index');
const adapter = require('../../infrastructure/database/todoadapter');
const Todo = require('../../domain/entities/todo');
class todoService{

    constructor(storeType) {
        //services have adapter
        this.adapter = new adapter(storeType);
    }

    async countAll(params) {
        try {
          return await this.adapter.countAll(params);
        } catch (error) {
          console.error(`Error counting items: ${error.message}`);
          throw new Error(`Error counting items: ${error.message}`);
        }
      }
      
      async create(title, description, status, userId) {
        try {
          
          
          if (!title || !description) {
            throw new Error('title and description fields cannot be empty');
          }
          
          const todoItem = Todo.create(Todo.makeid(), title, description, status, userId);
          await this.adapter.create(todoItem);
        } catch (error) {
          console.error(`Error creating item: ${error.message}`);
          throw new Error(`Failed to add todo: ${error.message}`);
        }
      }
      
      async findAll(params) {
        try {
          return await this.adapter.find(params);
        } catch (error) {
          console.error(`Error finding items: ${error.message}`);
          throw new Error(`Error finding items: ${error.message}`);
        }
      }
      
      async findOne(id) {
        try {
          return await this.adapter.findOne(id);
        } catch (error) {
          console.error(`Error finding item: ${error.message}`);
          throw new Error(`Error finding item: ${error.message}`);
        }
      }
      
      async findbyid(id) {
        try {
          return await this.adapter.findbyid({id});
        } catch (error) {
          console.error(`Error finding item by id: ${error.message}`);
          throw new Error(`Error finding item by id: ${error.message}`);
        }
      }
      
      async update(id, userId, title, description, status) {
        try {
          if (!title || !description) {
            throw new Error('title and description fields are mandatory');
          }
          const updatedPost = post({
            title,
            description,
            status,
            userId
          });
          const foundPost = await this.adapter.findbyid(id);
          if (!foundPost) {
            throw new Error(`No post found with id: ${id}`);
          }
          return await this.adapter.updateById(id, updatedPost);
        } catch (error) {
          console.error(`Error updating item by id: ${error.message}`);
          throw new Error(`Error updating item by id: ${error.message}`);
        }
      }
      
      async delete(id) {
        try {
          const todo = await this.adapter.findbyid({id});
          if (!todo) {
            throw new Error(`No post found with id: ${id}`);
          }
          console.log(todo);
          return await this.adapter.delete(todo._id);
        } catch (error) {
          console.error(`Error deleting item: ${error.message}`);
          throw new Error(`Error deleting item: ${error.message}`);
        }
      }
      
}


module.exports = todoService;