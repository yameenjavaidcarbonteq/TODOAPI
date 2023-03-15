class CreateTodoCommand {
    constructor(title, description, status, userId) {
      this.title = title;
      this.description = description;
      this.status = status;
      this.userId = userId;
    }
}
  
class UpdateTodoCommand {
    constructor(id, userId, title, description, status) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.description = description;
      this.status = status;
    }
}
  
class DeleteTodoCommand {
    constructor(id) {
      this.id = id;
    }
}
  
module.exports = {
  CreateTodoCommand,
  UpdateTodoCommand,
  DeleteTodoCommand
}