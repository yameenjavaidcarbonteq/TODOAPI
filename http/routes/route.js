const express = require("express");
const TodoRoute = require("./todo.routes");
const UserRoute = require("./auth.routes");

class Route {
  constructor() {
      this.router = express.Router();
    }
  
  createRoutes() {
    // Override in child classes
  }
  
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

module.exports = Route;