const PaginationData = require('../../../Application_Layer/Utils/PaginationData');
const PaginationOptions = require('../../../Application_Layer/Utils/PaginationOptions');


class CreateTodoHandler {
    constructor(todoService) {
      this.todoService = todoService;
    }
  
    async handle(command) {
      const { title, description, status, userId } = command;
      await this.todoService.create(title, description, status, userId);
      return 'todo created';
    }
}
  
class UpdateTodoHandler {
    constructor(todoService) {
      this.todoService = todoService;
    }
  
    async handle(command) {
      const { id, userId, title, description, status } = command;
      const message = await this.todoService.update(id, userId, title, description, status);
      return message;
    }
}
  
class DeleteTodoHandler {
    constructor(todoService) {
      this.todoService = todoService;
    }
  
    async handle(command) {
      const { id } = command;
      await this.todoService.delete(id);
      return 'todo deleted';
    }
}
  
module.exports = {
  CreateTodoHandler,
  DeleteTodoHandler,
  UpdateTodoHandler
}
  