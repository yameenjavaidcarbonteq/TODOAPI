const { logger } = require ("@logger");
const { config } = require ("@config");
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
      done(null, result);
    }catch(error){
      done(error.null);
    }
  };

module.exports = {
  authorization
};