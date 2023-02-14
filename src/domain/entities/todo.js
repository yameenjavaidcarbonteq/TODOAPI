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
  }
  
  module.exports = Todo;