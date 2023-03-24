const { logger } = require ("@logger");
const { config } = require ("@config");
const { UserStoreFactory } = require ('../../storeFactory/UserStoreFactory');
const { UserService } = require ('../../../application/services/UserService');
const { 
  CreateUserCommand, 
  GetUserByEmailCommand 
} = require ("../../../application/User/userCommands");
const { getUserCommandBus } = require("../../../application/utils/commandBus");

const loginGoogle = async  (accessToken, refreshToken, profile, done) => {
  try {
    
    const username = profile.displayName;
    const email = profile.emails[0].value;
    
    const repository = UserStoreFactory.getStore(config.dbtype);
    const service = new UserService(repository);
    const commandBus = getUserCommandBus(service);

    const command = new GetUserByEmailCommand(email);
    let user = await commandBus.handle(command);
    
    
    logger.info(`Finding User for email: ${email}`);
    if (user) {
      logger.info(`Found User: ${user}`);
      done(null, user);
    } 
    else 
    {
      logger.info(`Creating New User with email ${email}`)
      
      const command = new CreateUserCommand(username, email, null);
      user = await commandBus.handle(command);
      done(null, user);
    }
  } catch (error) {
    done(error, null);
  }
}

module.exports = {
  loginGoogle
};