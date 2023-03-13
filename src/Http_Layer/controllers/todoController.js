const logger = require('../../Infrastructure_Layer/logger/index');
const service = require('../../Application_Layer/services/todo')
const PaginationData = require('../../Application_Layer/Utils/PaginationData');
const PaginationOptions = require('../../Application_Layer/Utils/PaginationOptions');


class TodoController {

  constructor(dbRepository)
  {
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    
    this.todoService = new service(dbRepository);
    
  }
  // Done
  async createTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      await this.todoService.create(
        title,
        description,
        status,
        req.user.id
      );
      res.json('todo created');
    } catch (error) {
      logger.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }
  
  // Done
  
  async getTodos(req, res, next) {
    try 
    {
      const {pageNumber, pageLimit} = req.query;
      const paginationOptions = new PaginationOptions(pageNumber, pageLimit);
      const todos = await this.todoService.getPaginatedData(paginationOptions.offset(), paginationOptions.limit());
      const totalTodos = await this.todoService.countAll();
      const paginationData = new PaginationData(paginationOptions, totalTodos);
      todos.forEach((todo) => paginationData.addItem(todo));
      res.json(paginationData.getPaginatedData());
    } 
    catch (error) {
      logger.error(`Error getting todos: ${error.message}`);
      next(error);
    }
  }
  

  // Done

  async getTodoById(req, res, next) {
    try {
      const todo = await this.todoService.findbyid(req.query.id);
      if (!todo) {
        throw new Error(`No post found with id: ${req.query.id}`);
      }
      res.json(todo);
    } catch (error) {
      logger.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }
  
  async updateTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      
      

      const message = await this.todoService.update(
        req.query.id,
        req.user.id,
        title,
        description,
        status
      );
      res.json(message);
    } catch (error) {
      logger.error(`Error updating todo: ${error.message}`);
      next(error);
    }
  }
  
  async deleteTodo (req, res, next) {
    try {
      await this.todoService.delete(req.query.id);
      res.json('post successfully deleted!');
    } catch (error) {
      logger.error(`Error deleting todo: ${error.message}`);
      next(error);
    }
  }
  
}
module.exports = TodoController;
