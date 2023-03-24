const { v4: uuidv4 } = require('uuid');
class UserEntity {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password
  }
  
  static createFromParams(params) {
    const user = new UserEntity(uuidv4(), params.username, params.email, params.password);
    return user;
  }
  
  static createFromObject(obj) {
    console.log(obj);
    const user = new UserEntity(obj.id, obj.username, obj.email, obj.password);
    return user;
  }

  async setPassword(password) {
    this.password = await bcrypt.hash(password, 10);
  }

} 


module.exports = {
  UserEntity
};
