const express = require("express");
const TodoRoute = require("./todo.routes");
const AuthRoute = require("./auth.routes");

class Route {
  constructor() {
      this.router = express.Router();
    }
  
  createRoutes() {
    // Override in child classes
  }
  
   create(type) {
    if (type === 'todo') {
      return new TodoRoute();
    } else if (type === 'user') {
      return new AuthRoute();
    } else {
      throw new Error('Invalid type');
    }
  }
}


// class TodoRoute extends Route {
//   constructor() {
//       super();
//       this.TodoController = Controller.create('todo');
//   }

//   createRoutes() {
//       this.router.post('/', this.TodoController.createTodo.bind(this));
//       this.router.get('/', this.TodoController.getTodos.bind(this));
//       this.router.get('/:id/', this.TodoController.getTodoById.bind(this));
//       this.router.put('/:id/edit', this.TodoController.updateTodo.bind(this));
//       this.router.delete('/:id/delete', this.TodoController.deleteTodo.bind(this));
//   }

// }

// class AuthRoute extends Route {
//   constructor() {
//       super();
//       this.authController = Controller.create('user');
//   }

//   createRoutes() {
  
//       this.router.post('/login', this.authController.login.bind(this));
//       this.router.post('/register', this.authController.register.bind(this));
//       this.router.post('/logout', this.authController.logout.bind(this));
//   }
// }

module.exports = Route;