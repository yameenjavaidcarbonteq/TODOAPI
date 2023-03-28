const { logger } = require ("@logger");
const { config } = require ("@config");

const { UserNotFoundError } = require ("../../../http/errors/appError")

const { UserStoreFactory } = require ('../../storeFactory/UserStoreFactory');
const { UserService } = require ('../../../application/services/UserService');

const { GetUserByIdCommand } = require ("../../../application/User/");
const { getUserCommandBus } = require("../../../application/utils/commandBus");




  authorization = async (payload, done) => {
    try{
      const repository = UserStoreFactory.getStore(config.dbtype);
      const service = new UserService(repository);
      commandBus = getUserCommandBus(service);

      const command = new GetUserByIdCommand(payload.id);
      const result = await this.commandBus.handle(command);
      
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