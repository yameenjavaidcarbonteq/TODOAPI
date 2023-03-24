class UserHandler {
    
    constructor(todoService) {
        this.todoService = todoService;
    }
  
    async CreateUserHandler(command) {
        return await this.todoService.create(command.todoDetails());
    }
    async DeleteUserHandler(command) {
        return await this.todoService.delete(command.todoDetails());
    }
    async GetAllUsersHandler(command) {
        return await this.todoService.findAll(command.todoDetails());
    }
    async GetUserByIdHandler(command) {
        return await this.todoService.findbyId(command.todoDetails());
    }
    async GetUserByEmailHandler(command) {
        return await this.todoService.findbyEmail(command.todoDetails());
    }
    async UpdateUserHandler(command) {
        return await this.todoService.update(command.todoDetails());
    }
}

module.exports = { UserHandler };