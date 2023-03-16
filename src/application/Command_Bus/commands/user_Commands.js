export class CreateUserCommand {
    constructor(username, email, password, isVerified, googleId, provider) {
      this.username = username;
      this.email = email;
      this.password = password;
      this.isVerified = isVerified;
      this.googleId = googleId;
      this.provider = provider;
      
    }
}

export class DeleteUserCommand {
    constructor(id) {
      this.id = id;
    }
}
  
export class EditUserCommand {
    constructor(id, userId, username, email, password, isVerified, googleId, provider) {
      this.id = id;
      this.userId = userId;
      this.username = username;
      this.email = email;
      this.password = password;
      this.isVerified = isVerified;
      this.googleId = googleId;
      this.provider = provider;
    }
}

