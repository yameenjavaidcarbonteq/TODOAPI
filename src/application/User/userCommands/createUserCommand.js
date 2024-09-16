const { Command } = require("simple-command-bus");
class CreateUserCommand extends Command {
  constructor(username, email, password) {
    super();
    this.username = username;
    this.email = email;
    this.password = password;
  }
  
  userDetails() {
    return {
      username: this.username,
      email: this.email,
      password: this.password
    };
  }
}
module.exports = {
  CreateUserCommand
};
