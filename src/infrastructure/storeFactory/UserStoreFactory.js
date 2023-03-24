const {
  UserRepositoryMongoose,
  UserRepositorySequelize
} = require ("../repositories");

class UserStoreFactory{

  constructor()
  {

  }
  
  static getStore(repositoryType) {
    if (repositoryType === ('mongoose')) 
    {
      return new UserRepositoryMongoose();
    } 
    else if (repositoryType === ('sequelize'))
    {
      return new UserRepositorySequelize();
    }
  }  
}

module.exports = {
  UserStoreFactory
};

