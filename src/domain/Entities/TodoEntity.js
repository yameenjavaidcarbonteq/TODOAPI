const { v4: uuidv4 } = require('uuid');

class TodoEntity {
  constructor(id, title, description, status, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.userId = userId;
  }
  
  
  static createFromParams(params) {
    const toDo = new TodoEntity(uuidv4(), params.title, params.description, params.status, params.userId);
    return toDo;
  }
  static createFromObject(obj) {
    const toDo = new TodoEntity(obj.id, obj.title, obj.description, obj.status, obj.userId);
    return toDo;
  }

}

module.exports = {
  TodoEntity
};

