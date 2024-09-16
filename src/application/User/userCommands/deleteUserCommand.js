const { Command } = require("simple-command-bus");

class DeleteUserCommand extends Command {
    constructor(id) {
      super();
      this.id = id;
    }
    
    userDetails() {
      return {
        id: this.id
      };
    }
}

module.exports = {
  DeleteUserCommand
};