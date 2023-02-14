class User {
    constructor({ id, username, email, password }) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.password = password;
    }
  
    static create({ username, email, password }) {
      return new User({
        id: null,
        username,
        email,
        password,
      });
    }
  
    static fromData(data) {
      return new User(data);
    }
  }
  
  module.exports = User;