const { Command } = require("simple-command-bus");

class GetUserByIdCommand extends Command {
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
  GetUserByIdCommand
};