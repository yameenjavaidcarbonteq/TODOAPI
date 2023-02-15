class Todo {
    constructor({ id, title, description, status }) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
    }
  
    static create({ title, description }) {
      return new Todo({
        id: null,
        title,
        description,
        status: 'pending',
      });
    }
  
    static fromData(data) {
      return new Todo(data);
    }

    static toMongoData(todo) {
      return {
        _id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
      };
    }
  
    static toDomainEntity(data) {
      return new Todo({
        id: data._id,
        title: data.title,
        description: data.description,
        status: data.status,
      });
    }
  }
  
  module.exports = Todo;