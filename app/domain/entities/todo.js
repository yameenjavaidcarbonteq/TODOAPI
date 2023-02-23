const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }
  
  static create(title, description, done) {
    return new Todo(uuidv4(), title, description, done);
  }
}

module.exports = Todo;