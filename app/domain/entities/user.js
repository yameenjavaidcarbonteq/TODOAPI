class User {
    constructor(username, password, googleID, displayName) {
      this.username = username;
      this.password = password;
      this.googleID = googleID;
      this.displayName = displayName;
    }
  
    toObject() {
      return {
        username: this.username,
        password: this.password,
        googleID: this.googleID,
        displayName: this.displayName
      };
    }


    //Imports
    static fromObject(obj) {
      const user = new User(obj.username, obj.password);
      return new UserModel(user.toObject());
  }
}

module.exports = User;