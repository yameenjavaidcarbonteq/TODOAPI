const logger = require('../../../logger/index');

const store = require('../../../../Domain_Layer/interfaces/TodoRepository');
const todoMongo = require('../mongooseModels/todo');
const userMongo = require('../mongooseModels/user');

class Repositoy extends store {
    constructor() {
      super();
      this.todoModel = todoMongo;
      this.userModel = userMongo;
    }
  
    
    async validateTodo(todo) {
      logger.info("Validating Todo: ",todo);
      const user = await this.userModel.findOne({'id': todo.userId});
      logger.info(user);
      if (!user) {
        throw new Error('Invalid customer ID');
      }
    }

    async getPaginatedData(offset, limit) {
    
      try {
        return await this.todoModel.find().skip(offset).limit(limit);
      } catch (error) {
        logger.error(`Error finding todos: ${error.message}`);
        throw new Error(`Error finding todos: ${error.message}`);
      }
    }
    
    async find(query) {
      try {
        return await this.todoModel.find(query);
      } catch (error) {
        logger.error(`Error finding todos: ${error.message}`);
        throw new Error(`Error finding todos: ${error.message}`);
      }
    }
  
    async countAll() {
      try {
        return await this.todoModel.countDocuments();
      } catch (error) {
        logger.error(`Error counting items: ${error.message}`);
        throw new Error(`Error counting items: ${error.message}`);
      }
    }
  
    async findOne(id) {
      try {
        return await this.todoModel.findOne(id);
      } catch (error) {
        logger.error(`Error finding todo by id: ${error.message}`);
        throw new Error(`Error finding todo by id: ${error.message}`);
      }
    }
  
    async create(todoItem) {
      try {
        const newTodo = new this.todoModel({
          id: todoItem.id,
          title: todoItem.title,
          description: todoItem.description,
          status: todoItem.status,
          createdAt: new Date(),
          userId: todoItem.userId,
        });
  
        return await newTodo.save();
      } catch (error) {
        logger.error(`Error creating new todo: ${error.message}`);
        throw new Error(`Error creating new todo: ${error.message}`);
      }
    }
  
    async updateById(id, todoItem) {
      try {
        const updatedTodo = {
          title: todoItem.title,
          description: todoItem.description,
          status: todoItem.status,
        };
  
        return await this.todoModel.findOneAndUpdate({ _id: id }, { $set: updatedTodo }, { new: true });
      } catch (error) {
        logger.error(`Error updating todo by id: ${error.message}`);
        throw new Error(`Error updating todo by id: ${error.message}`);
      }
    }
  
    async delete(id) {
      try {
        logger.info(id);
        return await this.todoModel.findByIdAndDelete(id);
      } catch (error) {
        logger.error(`Error deleting todo by id: ${error.message}`);
        throw new Error(`Error deleting todo by id: ${error.message}`);
      }
    }
  }
  
module.exports = Repositoy;
