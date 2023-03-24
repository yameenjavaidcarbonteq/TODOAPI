const {
  CommandBus,
  LoggerMiddleware,
  CommandHandlerMiddleware,
  ClassNameExtractor,
  InMemoryLocator,
  HandleInflector
} = require("simple-command-bus");



const { TodoHandler }= require("../Todo/handler");
const { UserHandler } = require("../User/handler");


const { MethodNameInflector } = require("simple-command-bus");
const logger = require("../../infrastructure/logger");
class ClassNameInflector extends MethodNameInflector {
  constructor(methodName) {
    super();
    this.methodName =  "handle";
  }
  inflect(commandName, handler) {
    const handlerMethodName = commandName.replace('Command', 'Handler');
    const message = `Converted command class name "${commandName}" to handler method name "${handlerMethodName}"`;
    console.log(message);
    return handlerMethodName;
  }
};



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
        GetTodoByIdHandler: handler,
      }),
      new ClassNameInflector())]);
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
        DeleteUserHandler: handler,
        GetAllUsersHandler: handler,
        UpdateUserHandler: handler,
        DeleteUserHandler: handler,
        GetUserByIdHandler: handler,
        GetUserByEmailHandler: handler,
      }),
      new ClassNameInflector())]);
  return commandBus;


}

module.exports = {
  getTodoCommandBus,
  getUserCommandBus
};
