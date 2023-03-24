const {
  TodoRepositoryMongoose,
  TodoRepositoySequelize
} = require ("../repositories");

class TodoStoreFactory{

  constructor()
  {
    
  }

  static getStore(repositoryType) {
      if (repositoryType === ('mongoose')) 
      {
        return new TodoRepositoryMongoose();
      } 
      else if (repositoryType === ('sequelize'))
      {
        return new TodoRepositoySequelize();
      }
  }
}

module.exports = {
  TodoStoreFactory
} 