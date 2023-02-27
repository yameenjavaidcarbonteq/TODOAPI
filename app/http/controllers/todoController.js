const config = require('../../infrastructure/config/index');
const service = require('../../infrastructure/todo/todoservice');



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
  createTodo (req, res, next) 
  {
    const { title, description, status } = req.body;

    this.service.createTodo({
      title,
      description,
      status,
      userId: req.user.id,
      postRepository: dbRepository
    })
      .then(() => {
        return res.json('post added');
      })
      .catch((error) => next(error));
  }
  // Done

  getTodos (req, res, next) {
    
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
    params.userId = req.user.id;

    this.service.findAll(params, dbRepository)
      .then((todos) => {
        response.todos = todos;
        return countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  }

  // Done

  getTodoById (req, res, next) {
    
    this.service.findById(req.params.id, dbRepository)
    .then((todo) => {
      if (!todo) {
        throw new Error(`No post found with id: ${req.params.id}`);
      }
      res.json(todo);
    })
    .catch((error) => next(error));
    
    
  }

  updateTodo (req, res, next) {
    const { title, description, status } = req.body;

    this.service.updateById({
      id: req.params.id,
      userId: req.user.id,
      title ,
      description,
      status,
      todoRepository: dbRepository
    })
      .then((message) => res.json(message))
      .catch((error) => next(error));
  }
  
  
  deleteTodo (req, res, next) {
    this.service.deleteTodo(req.params.id, dbRepository)
      .then(() => res.json('post sucessfully deleted!'))
      .catch((error) => next(error));
  }
}
module.exports = TodoController;
