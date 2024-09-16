const { Command } = require("simple-command-bus");

class DeleteTodoCommand extends Command {
    constructor(id) {
      super();
      this.id = id;
    }
    
    todoDetails() {
      return {
        id: this.id
      };
    }
}

module.exports = {DeleteTodoCommand};
