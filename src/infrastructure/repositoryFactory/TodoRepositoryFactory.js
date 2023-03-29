const {
  TodoRepositoryMongoose,
  TodoRepositoySequelize
} = require ("../repositories");

class TodoRepositoryFactory{

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
  TodoRepositoryFactory
} 