const { v4: uuidv4 } = require('uuid');
class User {
    constructor(id, username, password, email, isVerified, googleId, provider) {
      
      this.id = id;
      this.username = username;
      this.password = password;
      this.email = email;
      this.isVerified = isVerified;
      this.googleId = googleId;
      this.provider = provider;
    }
    
    static makeid()
    {
      return uuidv4();
    }

    static create(id, username, password, email, isVerified, googleId, provider) {
      return new User(id, username, password, email, isVerified, googleId, provider);
    }

  }

module.exports = User;