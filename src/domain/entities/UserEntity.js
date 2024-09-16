const { v4: uuidv4 } = require('uuid');
class UserEntity {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password
  }
  
  static createFromParams(params) {
    let user;
    if(!params.id)
    {
      params.id = uuidv4();
    }
    user = new UserEntity(params.id, params.username, params.email, params.password);
    return user;
  }
  
  static createFromObject(obj) {
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
