const { Command } = require("simple-command-bus");

class UpdateUserCommand extends Command {
    constructor(id, username, email, password) {
      super();
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
    }

    userDetails() {
        return {
          id: this.id,
          username: this.username,
          email: this.email,
          password: this.password
        };
    }
}


module.exports = {
  UpdateUserCommand
};