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
    try {
      
      console.log("Came Here");
      const params = {};
      // Dynamically created query params based on endpoint params
      for (const key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
          params[key] = req.query[key];
        }
      }
      // predefined query params (apart from dynamically) for pagination
      // and current logged in user
      params.pageNumber = params.pageNumber ? parseInt(params.pageNumber, 10) : 1;
      params.pageLimit = params.pageLimit ? parseInt(params.pageLimit, 10) : 10;
      params.userId = req.user.id;
      
      console.log("New Params: .................",params);
      //calling services here
      const { 
        data, 
        page: pageNumber, 
        perPage: pageLimit, 
        total, 
        totalPages, 
        links 
      } = await this.service.getPaginatedData(params.pageNumber, params.pageLimit);
      res.json({ data, page: pageNumber, perPage: pageLimit, total, totalPages, links });
    
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
