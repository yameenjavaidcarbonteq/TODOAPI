const logger = require('../../../logger/index');

const store = require('../../../../domain/interfaces/storeInterfaceUser');
const userMongo = require('../mongo_models/user');


class MongoStore extends store {
    constructor() {
      super();
      this.model = userMongo;
    }
  
    async find(params) {
      try {
        return await this.model.find(params);
          
      } catch (error) {
        console.error(`Error finding users: ${error.message}`);
        throw new Error(`Error finding users: ${error.message}`);
      }
    }
  
    async countAll(params) {
      try {
        return await this.model.countDocuments(params);
      } catch (error) {
        console.error(`Error counting users: ${error.message}`);
        throw new Error(`Error counting users: ${error.message}`);
      }
    }
  
    async findOne(param) {
      try {
        console.log("Finding User: ",param);
        return await this.model.findOne(param);
      } catch (error) {
        console.error(`Error finding one user: ${error.message}`);
        throw new Error(`Error finding one user: ${error.message}`);
      }
    }
  
    async findbyid(id) {
      try {
        return await this.model.findbyid(id).select("-password");
      } catch (error) {
        console.error(`Error finding user by id: ${error.message}`);
        throw new Error(`Error finding user by id: ${error.message}`);
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
        // return await userDoc.save();
      } catch (error) {
        console.error(`Error creating a new user: ${error.message}`);
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
