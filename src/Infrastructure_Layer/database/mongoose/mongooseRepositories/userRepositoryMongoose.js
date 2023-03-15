const logger = require('../../../logger');

const store = require('../../../../Domain_Layer/interfaces/UserRepository');
const userMongo = require('../mongooseModels/user');


class MongoStore extends store {
    constructor() {
      super();
      this.model = userMongo;
    }
  
    async find(query) {
      try {
        return await this.model.find(query);
          
      } catch (error) {
        logger.error(`Error finding users: ${error.message}`);
        throw new Error(`Error finding users: ${error.message}`);
      }
    }
  
    async findOne(query) {
      try {
        return await this.model.findOne(query);
      } catch (error) {
        logger.error(`Error finding one user: ${error.message}`);
        throw new Error(`Error finding one user: ${error.message}`);
      }
    }
  
    async create(User) {
      try {
        const userDoc = new this.model({
          id: User.id,
          username: User.username,
          email: User.email,
          password: User.password,
          isVerified: User.isVerified,
          googleId: User.googleId,
          provider: User.provider,
        });
        const user = await userDoc.save(); 
        return user;
         return await userDoc.save();
      } catch (error) {
        logger.error(`Error creating a new user: ${error.message}`);
        throw new Error(`Error creating a new user: ${error.message}`);
      }
    }
  
    async update(User) {
      // Not Implemented
    }
  
    async delete(id) {
      // Not Implemented
    }
}
  
module.exports = MongoStore;
