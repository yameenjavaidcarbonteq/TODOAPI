const logger = require('../../infrastructure/logger/index');
const service = require('../../app/services/todo');
const config = require('../../infrastructure/config/index');


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
      console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
      await this.service.create(
        title,
        description,
        status,
        '3b2eac96-bc4e-48e3-851d-d67aca8c4596'
      );
      res.json('todo created');
    } catch (error) {
      console.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }
  
  // Done

  async getTodos(req, res, next) {
    try {
      const params = {};
      const response = {};
  
      // Dynamically created query params based on endpoint params
      for (const key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
          params[key] = req.query[key];
        }
      }
      // predefined query params (apart from dynamically) for pagination
      // and current logged in user
      params.page = params.page ? parseInt(params.page, 10) : 1;
      params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
      params.userId = 122;
  
      const todos = await this.service.findAll(params);
      response.todos = todos;
      const totalItems = await this.service.countAll(params);
      response.totalItems = totalItems;
      response.totalPages = Math.ceil(totalItems / params.perPage);
      response.itemsPerPage = params.perPage;
      res.json(response);
    } catch (error) {
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
      const message = await this.service.update({
        id: req.params.id,
        userId: req.user.id,
        title ,
        description,
        status
      });
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
