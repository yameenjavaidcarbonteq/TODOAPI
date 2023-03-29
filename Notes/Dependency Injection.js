/*
Dependency Injection (DI) is a design pattern that allows developers to create loosely coupled and 
flexible software components by externalizing the dependencies of an object and providing them to 
the object through an external source. The basic idea behind DI is to decouple the creation and 
management of dependencies from the code that uses them, allowing for easier testing, better modularity, 
and more flexibility.

The advantages of using Dependency Injection include:

Testability:    DI allows developers to easily test individual components of a system in isolation, 
                without requiring the entire system to be available.

Flexibility:    By externalizing dependencies, DI makes it easier to change dependencies without 
                modifying the code that uses them.

Reusability:    DI allows components to be reused in different contexts and configurations, without 
                requiring modifications to the component itself.

Modularity:     DI makes it easier to create smaller, more focused components that are easier to 
                understand and maintain.

Suppose you are building a web application that allows users to create and manage to-do lists. You 
have a controller that handles HTTP requests and a service that interacts with a database to create 
and manage to-do lists.

Without using Dependency Injection, the controller might create an instance of the service directly, 
like this:
*/
const ToDoService = require('./ToDoService');
const todoService = new ToDoService();

/*
    In this example, the ToDoService can be created and passed to the ToDoController like this:
    
    However, this approach tightly couples the controller to the ToDoService and makes it difficult to 
    test the controller in isolation.

    With Dependency Injection, the controller can be written like this instead:

*/
class ToDoController {
  constructor(todoService) {
    this.todoService = todoService;
  }
  
  async createTodo(req, res) {
    const todo = await this.todoService.create(req.body);
    res.json(todo);
  }
}

/*
    In this example, the ToDoController accepts a dependency, todoService, through its constructor. 
    This allows the controller to be more flexible and easier to test. When the application is started, 
    the ToDoService can be created and passed to the ToDoController like this:
*/

const ToDoController = require('./ToDoController');
const ToDoService = require('./ToDoService');
todoService = new ToDoService();
const todoController = new ToDoController(todoService);