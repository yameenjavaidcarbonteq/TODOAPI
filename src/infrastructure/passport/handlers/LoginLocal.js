
const bcrypt = require('bcrypt');

const { logger } = require ("@logger");
const { database } = require ("@config");
const { UserStoreFactory } = require ('../../storeFactory/UserStoreFactory');
const { GetUserByEmailCommand } = require ("../../../application/User");
const { getUserCommandBus } = require("../../../application");

const {
  InvalidUserDataError,
  UserNotFoundError,
  InvalidCredentialsError
} = require ("../../../http/errors/appError");


const loginLocal = async  (email, password, done) => {
  try 
  {
    
    const repository = UserStoreFactory.getStore(database.dbtype);
    const commandBus = getUserCommandBus(repository);

    const command = new GetUserByEmailCommand(email);
    const user = await commandBus.handle(command);
    
    logger.info(`Finding User for email: ${email}`);
    
    console.log(user);

    if (user)
    {
      logger.info(`Found User: ${user}`);
      if (user.password) 
      {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          done(new InvalidCredentialsError(400, 'Invalid credentials'));
        }
      } 
      else
        done(new InvalidUserDataError(400, 'Password missing'));
    } 
    else {
      done(new UserNotFoundError(400, 'User not found'));
    }
    done(null, user);
  }
  catch (error) 
  {
    done(error, null);
  }
}

module.exports = {
  loginLocal
};