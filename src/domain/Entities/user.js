import { uuidv4 } from'uuid';
export class UserEntity {
  constructor(id, username, email, password, isVerified, googleId, provider) {
    
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

  static create(id, username, email, password, isVerified, googleId, provider) {
    return new User(id, username, email, password, isVerified, googleId, provider);
  }
}

