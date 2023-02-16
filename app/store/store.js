const Todo = require('../domain/mongo_entities/todo');


class store{

  constructor() {
    if (new.target === advanceddb) {
      throw new TypeError("Cannot instantiate abstract class");
    }
}
  
  async createTodo (todo) {
    throw new Error("Method 'area' must be implemented.");
  }

  async getTodos () {
    throw new Error("Method 'area' must be implemented.");
  }

  async getTodoById (id) {
    throw new Error("Method 'area' must be implemented.");
  }

  async updateTodo (id, data) {
    throw new Error("Method 'area' must be implemented.");
  }

  async deleteTodo (id) {
    throw new Error("Method 'area' must be implemented.");
  }

}

module.exports = store;
