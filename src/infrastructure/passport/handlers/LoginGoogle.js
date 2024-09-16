const { logger } = require ("@logger");
const { database } = require ("@config");
const { UserRepositoryFactory } = require ('../../repositoryFactory/UserRepositoryFactory');
const { UserService } = require ('../../../application/User/UserService');
const { 
  CreateUserCommand, 
  GetUserByEmailCommand 
} = require ("../../../application/User");
const { getUserCommandBus } = require("../../../application/utils/commandBus");

const loginGoogle = async  (accessToken, refreshToken, profile, done) => {
  try {
    
    const username = profile.displayName;
    const email = profile.emails[0].value;
    
    const repository = UserRepositoryFactory.getStore(database.dbtype);
    const commandBus = getUserCommandBus(repository);
      
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