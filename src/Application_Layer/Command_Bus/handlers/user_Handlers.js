class CreateUserHandler {
    constructor(todoService) {
      this.todoService = todoService;
    }
  
    async handle(command) {
      const { username, email, password, isVerified, googleId, provider} = command;
      await this.todoService.create(username, email, password, isVerified, googleId, provider);
      return 'user created';
    }
}


class FindUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(command) {
      const user = await this.userService.findOne(command);
      if (!user) {
        throw new Error(`No user found with id: ${command}`);
      }
      return user;
    }
}
  
class GetUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(command) {
      const user = await this.userService.findbyid(command);
      if (!user) {
        throw new Error(`No user found with id: ${command}`);
      }
      return user;
    }
}
  
class GetAllUsersHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle() {
      const users = await this.userService.find({});
      return users;
    }
}
  
class DeleteUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(command) {
      await this.userService.deleteUser(command.id);
      return 'User successfully deleted!';
    }
}
  
class EditUserHandler {
    constructor(userService) {
      this.userService = userService;
    }
  
    async handle(command) {
      const message = await this.userService.editUser(
        command.id,
        command.userId,
        command.username,
        command.email,
        command.password,
        command.isVerified,
        command.googleId,
        command.provider
      );
      return message;
    }
}
  
module.exports = {
    CreateUserHandler,
    FindUserHandler,
    GetUserHandler,
    GetAllUsersHandler,
    DeleteUserHandler,
    EditUserHandler
}