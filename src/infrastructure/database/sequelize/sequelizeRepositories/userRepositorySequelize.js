
const logger = require('../../../logger/index');
const store = require('../../../../domain/interfaces/storeInterfaceUser');
const userSeq = require('../sequelizeModels/user');

class userRepositoy extends store{
    constructor() {
      super();
      this.model = userSeq;
    }
    
    async find() {
      try {
        throw new NotImplementedError();
      } catch (error) {
        console.error(`Error finding users: ${error.message}`);
        throw new Error(`Error finding users: ${error.message}`);
      }
    }
    
    async findOne(email) {
      try {
        const userRecord = await this.model.findOne({ where: { email } });
        if (!userRecord) {
          return null;
        }
        return userRecord;
      } catch (error) {
        console.error(`Error finding user: ${error.message}`);
        throw new Error(`Error finding user: ${error.message}`);
      }
    }
    
    async findbyid(id) {
      try {
        const userRecord = await this.model.findByPk(id);
        if (!userRecord) {
          return null;
        }
        return userRecord;
      } catch (error) {
        console.error(`Error finding user by id: ${error.message}`);
        throw new Error(`Error finding user by id: ${error.message}`);
      }
    }
    
    async create(userEntity) {
      try {
        await this.model.create({
          id: userEntity.id,
          username: userEntity.username,
          email: userEntity.email,
          password: userEntity.password,
          isVerified: userEntity.isVerified,
          googleId: userEntity.googleId,
          provider: userEntity.provider,
        });
      } catch (error) {
        console.error(`Error creating user: ${error.message}`);
        throw new Error(`Error creating user: ${error.message}`);
      }
    }
    
    async update(userEntity) {
      try {
        throw new NotImplementedError();
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
        throw new Error(`Error updating user: ${error.message}`);
      }
    }
    
    async delete(id) {
      try {
        throw new NotImplementedError();
      } catch (error) {
        console.error(`Error deleting user: ${error.message}`);
        throw new Error(`Error deleting user: ${error.message}`);
      }
    }
    
  }
  
module.exports = userRepositoy;
