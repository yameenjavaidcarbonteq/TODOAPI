src/ is the root directory of the project.

application/ contains the application layer, which represents the use cases and services that implement the business logic of the application.

application/usecases/ contains the use case classes that define the operations that can be performed on the domain entities.

application/services/ contains the service classes that implement the business logic of the application.

application/middlewares/ contains the middleware classes that define the common request processing logic for the application.

application/routes/ contains the route classes that define the URL endpoints for the application.

domain/ contains the domain layer, which represents the core business logic of the application.

domain/entities/ contains the entity classes that represent the core business objects of the application.

domain/repositories/ contains the repository classes that define the operations that can be performed on the domain entities.

infrastructure/ contains the infrastructure layer, which represents the implementation details of the application.

infrastructure/mongodb/ contains the MongoDB implementation details of the application.

infrastructure/mongodb/TodoAdapter.js contains the adapter class that translates between the MongoDB data and the domain entities for the Todo entity.

infrastructure/mongodb/TodoRepository.js contains the repository class that implements the CRUD operations on the Todo entity in MongoDB.

infrastructure/mongodb/UserAdapter.js contains the adapter class that translates between the MongoDB data and the domain entities for the User entity.

infrastructure/mongodb/UserRepository.js contains the repository class that implements the CRUD operations on the User entity in MongoDB.

This directory structure follows the Domain-Driven Design (DDD) approach to software development, with a clear separation between the domain layer, the application layer, and the infrastructure layer. The use of adapters helps to keep the domain entities isolated from the underlying storage technology, making it easier to switch to a different database or data format in the future without affecting the core business logic of the application.



..............12 FACTOR APP.............

https://github.com/yameenjavaid/TODOAPI

CodeBase -> One codebase tracked in revision control, many deploys

Dependency -> I use npm i instead of global install and i am isolations by package.json 

    "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "morgan": "^1.10.0",
    "mysql2": "^2.3.3",
    "sequelize": "^6.28.0"
  }
        -> Hence when i run npm install it will load the node modules with the version
        in package.json so my dev prod and feature branches dont crash due to versions
        of deps

        KEY NOTE:

        -> The '^'' symbol indicates that you want to use the latest version of the express package that is compatible with version 4.17.1. So, if the latest version of express is 4.17.3, that version will be installed. However, if a new major version of express (such as 5.0.0) is released that is not compatible with version 4.17.1, then npm will not install it, and will instead install the latest version that is compatible (in this case, 4.17.3).

        By specifying a version range with the ^ symbol, you ensure that your application stays up-to-date with bug fixes and new features, but at the same time, you prevent it from breaking if a new major version of a package is released with breaking changes.

        You can also use other version range specifiers such as ~ and > to specify different ranges of compatible versions. The exact behavior of each range specifier can be found in the npm documentation.

Config
    Ill be making a .env file to store
    -> mongo URI
    -> ip address (hostname)
    -> port
    -> Google OAuth API Key
        GOOGLE_CLIENT_ID=your_client_id
        GOOGLE_CLIENT_SECRET=your_client_secret

    for Now.


........................................



Factory Method Planning for TODO API

After studying the Factory Method Pattern I have decided to apply Approach in this Way

Since we are using Layered Architecture so we can make factory that can Create Each Layer

Factories and there respective Static Creates 
-> Controller
    todocontroller
    usercontroller
-> Model
    todomodel
    usermodel
-> Routes
    todoroutes
    userroutes
-> Services
    todoservices
    userservices

Now this Pattern i Have yet to understand the Advantage over the Previous Approach though

in Out ExpressAPP we can create instances of each component where required

like we can use todoroutes and userroutes in express-app.js and route them using express

Sample Planning for Factory Method So Far

-> Factory Classes

class Controller {
  static create(type) {
    if (type === 'todo') {
      return new TodoController();
    } else if (type === 'user') {
      return new UserController();
    } else {
      throw new Error('Invalid type');
    }
  }
}

class Model {
  static create(type) {
    if (type === 'todo') {
      return new TodoModel();
    } else if (type === 'user') {
      return new UserModel();
    } else {
      throw new Error('Invalid type');
    }
  }
}

class Route {
  static create(type) {
    if (type === 'todo') {
      return new TodoRoute();
    } else if (type === 'user') {
      return new UserRoute();
    } else {
      throw new Error('Invalid type');
    }
  }
}

class Service {
  static create(type) {
    if (type === 'todo') {
      return new TodoService();
    } else if (type === 'user') {
      return new UserService();
    } else {
      throw new Error('Invalid type');
    }
  }
}

-> SubClasses

class TodoController extends Controller {
  // implementation
}

class UserController extends Controller {
  // implementation
}

class TodoModel extends Model {
  // implementation
}

class UserModel extends Model {
  // implementation
}

class TodoRoute extends Route {
  // implementation
}

class UserRoute extends Route {
  // implementation
}

class TodoService extends Service {
  // implementation
}

class UserService extends Service {
  // implementation
}

-> USING FACTORIES

const todoController = Controller.create('todo');
const todoModel = Model.create('todo');
const todoRoute = Route.create('todo');
const todoService = Service.create('todo');

const userController = Controller.create('user');
const userModel = Model.create('user');
const userRoute = Route.create('user');
const userService = Service.create('user');
