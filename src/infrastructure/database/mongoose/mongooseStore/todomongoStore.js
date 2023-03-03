const logger = require('../../../logger/index');

const store = require('../../../../domain/interfaces/storeInterfaceTodo');
const todoMongo = require('../mongo_models/todo');
const userMongo = require('../mongo_models/user');

class MongoStore extends store {
    constructor() {
      super();
      this.todoModel = todoMongo;
      this.userModel = userMongo;
    }
  
    omit(obj, ...props) {
      const result = { ...obj };
      props.forEach((prop) => delete result[prop]);
      console.log("New Params: ",result);
      return result;
    }
    
    async validateTodo(todo) {
      console.log("Validating Todo: ",todo);
      const user = await this.userModel.findOne({'id': todo.userId});
      console.log(user);
      if (!user) {
        throw new Error('Invalid customer ID');
      }
    }

    async find(params) {
      try {
        return await this.todoModel
          .find(this.omit(params, "page", "perPage", "userId"))
          .skip(params.perPage * params.page - params.perPage)
          .limit(params.perPage);
      } catch (error) {
        console.error(`Error finding todos: ${error.message}`);
        throw new Error(`Error finding todos: ${error.message}`);
      }
    }
  
    async countAll(params) {
      try {
        return await this.todoModel.countDocuments(this.omit(params, "page", "perPage"));
      } catch (error) {
        console.error(`Error counting items: ${error.message}`);
        throw new Error(`Error counting items: ${error.message}`);
      }
    }
  
    async findbyid(id) {
      try {
        return await this.todoModel.findOne(id);
      } catch (error) {
        console.error(`Error finding todo by id: ${error.message}`);
        throw new Error(`Error finding todo by id: ${error.message}`);
      }
    }
  
    async findOne(id) {
      try {
        return await this.todoModel.findOne(id);
      } catch (error) {
        console.error(`Error finding todo by id: ${error.message}`);
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
        console.error(`Error creating new todo: ${error.message}`);
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
        console.error(`Error updating todo by id: ${error.message}`);
        throw new Error(`Error updating todo by id: ${error.message}`);
      }
    }
  
    async delete(id) {
      try {
        console.log(id);
        return await this.todoModel.findByIdAndDelete(id);
      } catch (error) {
        console.error(`Error deleting todo by id: ${error.message}`);
        throw new Error(`Error deleting todo by id: ${error.message}`);
      }
    }
  }
  
module.exports = MongoStore;
