//Still Undergoing Refactoring so PLease dont Judge


class Todo {
    constructor(id, title, description, status) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
    }
  
    toObject() {
        return {
          id: this.id,
          title: this.title,
          description: this.description,
          status: this.status
        };
    }
    

    //Imports
    static fromObject(obj) {
        const todo = new Todo(obj.id, obj.title, obj.description, obj.status);
        return new TodoModel(todo.toObject());
    }
}

module.exports = Todo;