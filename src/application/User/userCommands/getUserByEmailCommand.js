const { Command } = require("simple-command-bus");

class GetUserByEmailCommand extends Command {
  constructor(email) {
    super();
    this.email = email;
  }

  userDetails() {
    return {
      email: this.email
    };
  }
}


module.exports = {
  GetUserByEmailCommand
};