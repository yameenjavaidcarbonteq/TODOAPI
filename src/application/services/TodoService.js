const {TodoEntity} = require  ('@domain');
const { logger } = require('../../infrastructure/logger');
const {PaginationOptions} = require ("../../infrastructure/utils/PaginationOptions");

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
    return await this.todoRepository.findAll(query, paginatedOptions);
  }

  async findbyId(params) {
    return await this.todoRepository.findbyId(params.id);
  }

  async create(params) {
    const todoItem = TodoEntity.createFromParams(params);
    return await this.todoRepository.create(todoItem);
  }
  
  async update(params) {
    const updatedTodo = TodoEntity.createFromParams(params);
    return await this.todoRepository.update(updatedTodo);
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