const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor(id, title, description, status) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }
  
  static makeid()
  {
    return uuidv4();
  }

  static create(id, title, description, done) {
    return new Todo(id, title, description, done);
  }
}

module.exports = Todo;