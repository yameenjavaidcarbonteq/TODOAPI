const logger = require('../../Infrastructure_Layer/logger');
const service = require('../../Application_Layer/services/todo')

const Commands = require ('../../Application_Layer/Command_Bus/commands/todo_Commands');
const CommandBus_handler = require('../../Application_Layer/Command_Bus/handlers/todo_Handlers');
const CommandBus = require('../../Application_Layer/Command_Bus/command_bus');

const Queries = require ('../../Application_Layer/Query_Bus/queries/todo_Queries');
const QueryBus_handler = require('../../Application_Layer/Query_Bus/handlers/todo_Handlers');
const QueryBus = require('../../Application_Layer/Query_Bus/query_bus');



class TodoController {

  constructor(dbRepository)
  {
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    
    
    const todoService = new service(dbRepository);
    
    logger.info(`Creating Command handlers for Todos `);
    const createTodoHandler = new CommandBus_handler.CreateTodoHandler(todoService);
    const updateTodoHandler = new CommandBus_handler.UpdateTodoHandler(todoService);
    const deleteTodoHandler = new CommandBus_handler.DeleteTodoHandler(todoService);
    logger.info(`Creating Query handlers for Todos `);
    const getTodoByIdHandler = new QueryBus_handler.GetTodoByIdHandler(todoService);
    const getTodosHandler = new QueryBus_handler.GetTodosHandler(todoService);
    
    logger.info(`Initiating Command Bus for Todos`);
    this.CommandBus = new CommandBus();

    logger.info(`Initiating Query Bus for Todos`);
    this.QueryBus = new QueryBus();
    
    logger.info(`Registering command and their handlers to Query Bus for Todos `)
    this.CommandBus.register(Commands.CreateTodoCommand.name, createTodoHandler);
    this.CommandBus.register(Commands.UpdateTodoCommandname, updateTodoHandler);
    this.CommandBus.register(Commands.DeleteTodoCommand.name, deleteTodoHandler);
    
    logger.info(`Registering queries and their handlers to Query Bus for Todos `)
    this.QueryBus.register(Queries.GetTodosQuery.name, getTodosHandler);
    this.QueryBus.register(Queries.GetTodoByIdQuery.name, getTodoByIdHandler);
    
    
  }
  // Done
  async createTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      
      const command = new Commands.CreateTodoCommand(title, description, status, 1);
      const result = await this.CommandBus.execute(command);
      res.json(result);
    
    } catch (error) {
      logger.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }
  
  // Done

  async updateTodo (req, res, next) {
    try {
      const { title, description, status } = req.body;
      
      const command = new Commands.UpdateTodoCommand(req.params.id, req.user.id, title, description, status);
      const result = await this.CommandBus.execute(command);
      res.json(result);

    } catch (error) {
      logger.error(`Error updating todo: ${error.message}`);
      next(error);
    }
  }
  
  async deleteTodo (req, res, next) {
    try {
      const command = new Commands.DeleteTodoCommand(req.params.id);
      const result = await this.CommandBus.execute(command);
      res.json(result);

    } catch (error) {
      logger.error(`Error deleting todo: ${error.message}`);
      next(error);
    }
  }
  
  async getTodos(req, res, next) {
    try 
    {
      const { pageNumber, pageLimit } = req.query;
      
      const query = new Queries.GetTodosQuery(pageNumber, pageLimit);
      const result = await this.QueryBus.execute(query);
      res.json(result);
    } 
    catch (error) {
      logger.error(`Error getting todos: ${error.message}`);
      next(error);
    }
  }
  

  // Done

  async getTodoById(req, res, next) {
    try {
      
      const query = new Queries.GetTodoByIdQuery(req.params.id);
      const result = await this.QueryBus.execute(query);
      res.json(result);

    } catch (error) {
      logger.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }
}
module.exports = TodoController;
