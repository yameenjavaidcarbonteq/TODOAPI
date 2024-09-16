const { TodoService } = require("./TodoService");
class TodoHandler {
    
    constructor(repository) {
        this.todoService = new TodoService(repository);
    }
    
    CreateTodoHandler = async (command) => {
        return await this.todoService.create(command.todoDetails());
    }
    DeleteTodoHandler = async (command) => {
        return await this.todoService.delete(command.todoDetails());
    }
    GetAllTodosHandler = async (command) => {
        return await this.todoService.findAll(command.todoDetails());
    }
    GetTodoByIdHandler = async (command) => {
        return await this.todoService.findbyId(command.todoDetails());
    }
    UpdateTodoHandler = async (command) => {
        return await this.todoService.update(command.todoDetails());
    }
}

module.exports = { TodoHandler };