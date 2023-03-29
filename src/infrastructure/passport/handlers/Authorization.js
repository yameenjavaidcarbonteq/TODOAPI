const { logger } = require ("@logger");
const { database } = require ("@config");

const { UserNotFoundError } = require ("../../../http/errors/appError")

const { UserRepositoryFactory } = require ('../../repositoryFactory/UserRepositoryFactory');
const { UserService } = require ('../../../application/User/UserService');

const { GetUserByIdCommand } = require ("../../../application/User/");
const { getUserCommandBus } = require("../../../application/utils/commandBus");




  authorization = async (payload, done) => {
    try{
      const repository = UserRepositoryFactory.getStore(database.dbtype);
      const commandBus = getUserCommandBus(repository);
      
      const command = new GetUserByIdCommand(payload.id);
      const result = await commandBus.handle(command);
      
      if (!result) {
        throw new UserNotFoundError(404, 'User not found');
      }
      done(null, result);
    }catch(error){
      done(error);
    }
  };

module.exports = {
  authorization
};