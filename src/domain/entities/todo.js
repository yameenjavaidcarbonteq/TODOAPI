const { v4: uuidv4 } = require('uuid');

class Todo {
  constructor(id, title, description, status, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.userId = userId;
  }
  
  static makeid()
  {
    return uuidv4();
  }

  static create(id, title, description, done, userId) {
    let temptodo = new Todo(id, title, description, done, userId); 
    return temptodo;
  }
}

module.exports = Todo;