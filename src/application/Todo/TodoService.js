const {TodoEntity} = require  ('@domain');
const { logger } = require('../../infrastructure/logger');
const {PaginationOptions} = require ("../../infrastructure/utils/PaginationOptions");

const todoEventsListner = require('../integrationEvents/todoEvent');

const {
  InvalidTodoData,
  TodoNotFoundError,
  InternalServerError,
  UnAuthorizedError,
  UnExpextedDatabaseError
} = require ('../../http/errors/appError');


class TodoService{

  constructor(todoRepository) {
    logger.info("Initializing Todo Service");
    this.todoRepository = todoRepository;
  }

  async findAll(params) {
    
    const query = {};
    const paginatedOptions = new PaginationOptions(params.pageNumber,params.pageLimit);
    
    const todosCount  = await this.client.todo.count();
    const paginatedData = new PaginationData(paginatedOptions, todosCount);
      
    const paginatedTodos = await this.todoRepository.findAll(query, paginatedOptions);
    
    paginatedTodos.forEach(function (toDo) {
      paginatedData.addItem(TodoEntity.createFromObject(toDo))
    });
    return paginatedData.getPaginatedData();
  }

  async findbyId(params) {
    return await this.todoRepository.findbyId(params.id);
  }

  async create(params) {
    const todoItem = TodoEntity.createFromParams(params);
    const result = await this.todoRepository.create(todoItem);
    todoEventsListner.emit('todoCreated', result);
    return result;
  }
  
  async update(params) {
    const updatedTodo = TodoEntity.createFromParams(params);
    const result = await this.todoRepository.update(updatedTodo);
    todoEventsListner.emit('todoUpdated', result);
    return result;
  }
  
  async delete(params) {
    const todo = await this.todoRepository.findbyId(params.id);
    if(!todo)
    {
      throw new TodoNotFoundError(400, 'Todo not found');
    }
    else
    {
      const todoItem = TodoEntity.createFromObject(todo);
      await this.todoRepository.delete(todoItem);
    }
  }
}

module.exports = {
  TodoService
};