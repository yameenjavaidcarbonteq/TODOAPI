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
    
    static create(id, username, password, email, isVerified, googleId, provider) {
      return new User(id, username, password, email, isVerified, googleId, provider);
    }

  }

module.exports = User;