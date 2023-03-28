const { UserService } = require("../services");

class UserHandler {
    
    constructor(repository) {
        this.userService = new UserService(repository);
    }
  
    async CreateUserHandler(command) {
        return await this.userService.create(command.userDetails());
    }
    async DeleteUserHandler(command) {
        return await this.userService.delete(command.userDetails());
    }
    async GetAllUsersHandler(command) {
        return await this.userService.find(command.userDetails());
    }
    async GetUserByIdHandler(command) {
        return await this.userService.findbyId(command.userDetails());
    }
    async GetUserByEmailHandler(command) {
        return await this.userService.findbyEmail(command.userDetails());
    }
    async UpdateUserHandler(command) {
        return await this.userService.update(command.userDetails());
    }
}

module.exports = { UserHandler };