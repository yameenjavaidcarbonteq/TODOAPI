const { Command } = require("simple-command-bus");

class UpdateTodoCommand extends Command {
    constructor(id, title, description, status, userId) {
      super();
      this.id = id;
      this.title = title;
      this.description = description;
      this.status = status;
      this.userId = userId;
    }

    todoDetails() {
        return {
          id: this.id,
          description: this.description,
          title: this.title,
          status: this.status,
          userId: this.userId
        };
    }
}


module.exports = {UpdateTodoCommand};