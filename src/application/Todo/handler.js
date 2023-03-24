class TodoHandler {
    
    constructor(todoService) {
        this.todoService = todoService;
    }
  
    async CreateTodoHandler(command) {
        return await this.todoService.create(command.todoDetails());
    }
    async DeleteTodoHandler(command) {
        return await this.todoService.delete(command.todoDetails());
    }
    async GetAllTodosHandler(command) {
        return await this.todoService.findAll(command.todoDetails());
    }
    async GetTodoByIdHandler(command) {
        return await this.todoService.findbyId(command.todoDetails());
    }
    async UpdateTodoHandler(command) {
        return await this.todoService.update(command.todoDetails());
    }
}

module.exports = { TodoHandler };