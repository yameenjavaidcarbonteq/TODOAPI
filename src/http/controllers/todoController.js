const logger = require('../../infrastructure/logger/index');
const service = require('../../app/services/todo');
const config = require('../../infrastructure/config/index');

const PaginationData = require('../../app/Utils/PaginationData');
const PaginationInfo = require('../../app/Utils/PaginationInfo');
const PaginationOptions = require('../../app/Utils/PaginationOptions');


class TodoController {

  constructor()
  {
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    
    this.service = new service(config.dbtype);
    
  }
  // Done
  async createTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      await this.service.create(
        title,
        description,
        status,
        req.user.id
      );
      res.json('todo created');
    } catch (error) {
      console.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }
  
  // Done
  
  async getTodos(req, res, next) {
    try 
    {
      const {pageNumber, pageLimit} = req.query;
      const paginationOptions = new PaginationOptions(pageNumber, pageLimit);
      const todos = await this.service.getPaginatedData(paginationOptions.offset(), paginationOptions.limit());
      const totalTodos = await this.service.countAll();
      const paginationData = new PaginationData(paginationOptions, totalTodos);
      todos.forEach((todo) => paginationData.addItem(todo));
      res.json(paginationData.getPaginatedData());
    } 
    catch (error) {
      console.error(`Error getting todos: ${error.message}`);
      next(error);
    }
  }
  

  // Done

  async getTodoById(req, res, next) {
    try {
      const todo = await this.service.findbyid(req.params.id);
      if (!todo) {
        throw new Error(`No post found with id: ${req.params.id}`);
      }
      res.json(todo);
    } catch (error) {
      console.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }
  
  async updateTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      
      console.log({ title, description, status });

      const message = await this.service.update(
        req.params.id,
        req.user.id,
        title,
        description,
        status
      );
      res.json(message);
    } catch (error) {
      console.error(`Error updating todo: ${error.message}`);
      next(error);
    }
  }
  
  async deleteTodo (req, res, next) {
    try {
      await this.service.delete(req.params.id);
      res.json('post successfully deleted!');
    } catch (error) {
      console.error(`Error deleting todo: ${error.message}`);
      next(error);
    }
  }
  
}
module.exports = TodoController;
