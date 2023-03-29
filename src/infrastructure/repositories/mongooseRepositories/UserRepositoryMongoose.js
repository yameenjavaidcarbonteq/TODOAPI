const {
  UserEntity,
  IUserRepository} = require ("@domain");

  const UserModelMongoose = require ("../../models/mongooseModels/UserModelMongoose");

class UserRepositoryMongoose extends IUserRepository {
    constructor() {
      super();
      this.userModel = UserModelMongoose;
    }
  
    async find(query) {
      const userDocs = await this.userModel.find(query);
      if(userDocs.length){
        const userEntities = userDocs.map(userObj => {
          const userEntity = UserEntity.createFromObject(userObj);
          return userEntity;
        });
        return userEntities;
      }
      return null;
    }

    async findbyId(id) {
      const userDoc = await this.userModel.findOne({id});
      if(userDoc){
        return UserEntity.createFromObject(userDoc);
      }
    }

    async findbyEmail(email) {
      const userDoc = await this.userModel.findOne({email});
      if(userDoc){
        return UserEntity.createFromObject(userDoc);
      }
    }

    
    async create(user) {
      const userDoc = await this.userModel.create(user);
      return UserEntity.createFromObject(userDoc);
    }
    
    async isValid(userId) {
      return await this.userModel.exists({ id: userId });
    }

    async update(userItem) {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { id: userItem.id },userItem,{new: true});
        console.log(userItem);
        console.log(updatedUser);
        if (updatedUser) {
        return UserEntity.createFromObject(updatedUser);
      }
    }
  
    async delete(userItem) {
      return await this.userModel.findOneAndRemove(userItem);
    }

}

module.exports = {
  UserRepositoryMongoose
};