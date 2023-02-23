const store = require('../../domain/interfaces/storeInterfaceUser');
const userSeq = require('../sequelize_models/user');
const UserEntity =  require('../../domain/entities/todo');

class sequelizeStore extends store{
    constructor() {
      super();
      this.model = userSeq;
    }
    
    async find() {
      // Not Implemented
    }
  
    async findOne(email) {
      const todoRecord = await this.model.findOne({ where: email });
      if (!todoRecord) {
        return null;
      }
      const temp =  new UserEntity(todoRecord.id, todoRecord.username, todoRecord.password, todoRecord.email, todoRecord.isVerified, todoRecord.googleId, todoRecord.provider);
      return temp;
    }
    
    async findbyid(id) {
      const todoRecord = await this.model.findOne({ where: id });
      if (!todoRecord) {
        return null;
      }
      const temp =  new UserEntity(todoRecord.id, todoRecord.username, todoRecord.password, todoRecord.email, todoRecord.isVerified, todoRecord.googleId, todoRecord.provider);
      return temp;
    }
  
    async create(UserEntity) {
      await this.model.create({
        id: UserEntity.id,
        username: UserEntity.username,
        email: UserEntity.email,
        password: UserEntity.password,
        isVerified: UserEntity.isVerified,
        googleId: UserEntity.googleId,
        provider: UserEntity.provider,
      });
    }
  
    async update(UserEntity) {
      // Not Implemented
    }
  
    async delete(id) {
      // Not Implemented
    }
  }
  
module.exports = sequelizeStore;
