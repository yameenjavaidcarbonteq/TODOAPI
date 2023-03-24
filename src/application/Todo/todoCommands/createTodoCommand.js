const { Command } = require("simple-command-bus");
class CreateTodoCommand extends Command {
    constructor(title, description, status, userId) {
      super();
      this.title = title;
      this.description = description;
      this.status = status;
      this.userId = userId;
    }

    todoDetails() {
        return {
          description: this.description,
          title: this.title,
          status: this.status,
          userId: this.userId
        };
    }

}


module.exports = {CreateTodoCommand};