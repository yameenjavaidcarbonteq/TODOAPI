
const bcrypt = require('bcrypt');

const { logger } = require ("@logger");
const { config } = require ("@config");
const { UserStoreFactory } = require ('../../storeFactory/UserStoreFactory');
const { UserService } = require ('../../../application/services/UserService');
const { GetUserByEmailCommand } = require ("../../../application/User");
const { getUserCommandBus } = require("../../../application");

const loginLocal = async  (email, password, done) => {
  try 
  {
    
    const repository = UserStoreFactory.getStore(config.dbtype);
    const service = new UserService(repository);
    const commandBus = getUserCommandBus(service);

    const command = new GetUserByEmailCommand(email);
    const user = await commandBus.handle(command);
    
    logger.info(`Finding User for email: ${email}`);
    
    if (user) 
    {
      logger.info(`Found User: ${user}`);
      if (user.password) 
      {
        (await bcrypt.compare(password, user.password))
          ? done(null, user)
          : done(null, null);
      } else
      done(null, false);
    } 
    else {
      done(null, false);
    }
  }
  catch (error) 
  {
    done(error, null);
  }
}

module.exports = {
  loginLocal
};