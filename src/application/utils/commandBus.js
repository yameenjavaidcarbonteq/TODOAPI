const {
  CommandBus,
  LoggerMiddleware,
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");



const TodoHandler = require("../Todo/handler");
const UserHandler = require("../User/handler");


const getTodoCommandBus = function(todoService){
  
  const handler = new TodoHandler(todoService);
  const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    new CommandHandlerMiddleware(
      new ClassNameExtractor(),
      new InMemoryLocator({
        CreateTodoHandler: handler,
        DeleteTodoHandler: handler,
        GetAllTodosHandler: handler,
        UpdateTodoHandler: handler,
        DeleteTodoHandler: handler,
        GetTodoByIdHandler: handler,
      }),
      new HandleInflector())]);
  return commandBus;
}


const getUserCommandBus = function(userService){

  const handler = new UserHandler(userService);
  const commandBus = new CommandBus([
    new LoggerMiddleware(console),
    new CommandHandlerMiddleware(
      new ClassNameExtractor(),
      new InMemoryLocator({
        CreateUserHandler: handler,
        DeleteUserHandler: hanlder,
        GetAllUsersHandler: handler,
        UpdateUserHandler: handler,
        DeleteUserHandler: handler,
        GetUserByIdHandler: handler,


        GetUserByEmailHandler: handler,
      }),
      new HandleInflector())]);
  return commandBus;


}

module.exports = {
  getTodoCommandBus,
  getUserCommandBus
};
