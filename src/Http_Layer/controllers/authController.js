const service = require('../../Application_Layer/services/user');
const logger = require('../../Infrastructure_Layer/logger');
const bcrypt = require('bcrypt');

const Commands = require ('../../Application_Layer/Command_Bus/commands/user_Commands');
const CommandBus_handler = require('../../Application_Layer/Command_Bus/handlers/user_Handlers');
const CommandBus = require('../../Application_Layer/Command_Bus/command_bus');

const Queries = require ('../../Application_Layer/Query_Bus/queries/user_Queries');
const QueryBus_handler = require('../../Application_Layer/Query_Bus/handlers/user_Handlers');
const QueryBus = require('../../Application_Layer/Query_Bus/query_bus');


const GenericResponseDTO = require('../../Application_Layer/DTO/generic.response.dto');

class AuthController {

  constructor(dbRepository)
  {
    
    this.logout = this.logout.bind(this);
    this.loginGoogle = this.loginGoogle.bind(this);
    this.loginLocal = this.loginLocal.bind(this);
    this.createNewUserGoogle = this.createNewUserGoogle.bind(this);
    this.createNewUserLocal = this.createNewUserLocal.bind(this);
    
    this.userService = new service(dbRepository);
  
    logger.info(`Creating Command handlers for Users `);
    const createUserHandler = new CommandBus_handler.CreateUserHandler(this.userService);
    const deleteUserHandler = new CommandBus_handler.DeleteUserHandler(this.userService);
    const editUserHandler = new CommandBus_handler.EditUserHandler(this.userService);
    
    logger.info(`Creating Query handlers for Users `);
    const findUserHandler = new QueryBus_handler.FindUserHandler(this.userService);
    const getUserHandler = new QueryBus_handler.GetUserHandler(this.userService);
    const getAllUsersHandler = new QueryBus_handler.GetAllUsersHandler(this.userService);
    
    logger.info(`Initiating Command Bus for Users`);
    this.CommandBus = new CommandBus();
    
    logger.info(`Initiating Query Bus for Users`);
    this.QueryBus = new QueryBus();
    
    logger.info(`Registering command and their handlers to Query Bus for Users `)
    this.CommandBus.register(Commands.CreateUserCommand.name, createUserHandler);
    this.CommandBus.register(Commands.EditUserCommand.name, editUserHandler);
    this.CommandBus.register(Commands.DeleteUserCommand.name, deleteUserHandler);
    
    logger.info(`Registering queries and their handlers to Query Bus for Users `)
    this.QueryBus.register(Queries.FindUserQuery.name, findUserHandler);
    this.QueryBus.register(Queries.GetUserQuery.name, getUserHandler);
    this.QueryBus.register(Queries.GetAllUsersQuery.name, getAllUsersHandler);
    
  
  }
  
  async logout (req, res, next) {
    req.logout((error) => {
      if (error)
      {
        next(error)
      }
      res.json({'Message': 'Logged Out'});
    });
  }

  // Login Using Google passport
  async loginGoogle (accessToken, refreshToken, profile, done) {
    try {
      let params = {};
      params.email = profile.emails[0].value;
      const query = new Queries.FindUserQuery(params);
      const user = await this.QueryBus.execute(query);
      
      logger.info(`Finding User for email: ${params}`);
      if (user) {
        logger.info(`Found User: ${user}`);
        done(null, user);
      } 
      else 
      {
        logger.info(`Creating New User with email ${query.email}`)
        user = await this.createNewUserGoogle(profile);
        done(null, user);
      }
    } catch (error) {
      done(error, null);
    }
  }

  // Login Using Local passport
  async loginLocal (email, password, done) 
  {
    try 
    {
      let params = {};
      params.email = email;
      const query = new Queries.FindUserQuery(params);
      const user = await this.QueryBus.execute(query);
      
      logger.info(`Finding User for email: ${params}`);
      
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


  //Create User Google 
  async createNewUserGoogle (profile){
    try {
      
      const username = profile.displayName;
      const googleId = profile.id;
      const email = profile.emails[0].value;
      
      const command = new Commands.CreateUserCommand(username, email, null, true, googleId, 'google');
      const createdUser = await this.CommandBus.execute(command);
      return createdUser;
    } catch (error) {
      return { error: error };
    }
  }

  async createNewUserLocal (request, response, next){
    try {
      const {
        email,
        username,
        password,
      } = request.body;
      
      if (!password) {
        throw { message: "Please type all required data!", status: 400 };
      }

      
      const command = new Commands.CreateUserCommand(username, email, password, true, null, 'email');
      const createdUser = await this.CommandBus.execute(command);
      
      request.user = {
        id: createdUser.id,
        email: createdUser.email
      };
      next();
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  };
}
module.exports = AuthController;
