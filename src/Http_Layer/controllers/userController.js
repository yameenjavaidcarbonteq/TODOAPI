const logger = require('../../Infrastructure_Layer/logger');
const service = require('../../Application_Layer/services/user')

const Commands = require ('../../Application_Layer/Command_Bus/commands/user_Commands');
const CommandBus_handler = require('../../Application_Layer/Command_Bus/handlers/user_Handlers');
const CommandBus = require('../../Application_Layer/Command_Bus/command_bus');

const Queries = require ('../../Application_Layer/Query_Bus/queries/user_Queries');
const QueryBus_handler = require('../../Application_Layer/Query_Bus/handlers/user_Handlers');
const QueryBus = require('../../Application_Layer/Query_Bus/query_bus');


class UserController {
  constructor(dbRepository) {
    
    this.createUser = this.createUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.editUser = this.editUser.bind(this);
    // this.isEmailUsed = this.isEmailUsed.bind(this);
    // this.findUsers = this.findUsers.bind(this);

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
    this.CommandBus.register(Commands.CreateUserCommand, createUserHandler);
    this.CommandBus.register(Commands.EditUserCommand.name, editUserHandler);
    this.CommandBus.register(Commands.DeleteUserCommand.name, deleteUserHandler);
    
    logger.info(`Registering queries and their handlers to Query Bus for Users `)
    this.QueryBus.register(Queries.FindUserQuery.name, findUserHandler);
    this.QueryBus.register(Queries.GetUserQuery.name, getUserHandler);
    this.QueryBus.register(Queries.GetAllUsersQuery.name, getAllUsersHandler);
    
  
  }

  async createUser (req, res, next) {
    try {
      const { username, email, password } = req.body;
      
      const command = new Commands.CreateUserCommand(username, email, password, true, null, 'email');
      const result = await commandBus.execute(command);
      res.json(result);
    
    } catch (error) {
      logger.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }

  async deleteUser (req, res) {
    try {
      const command = new Commands.DeleteUserCommand(req.query.id);
      const result = await this.CommandBus.execute(command);
      res.json(result);
    } catch (error) {
      logger.error(`Error deleting user: ${error.message}`);
      next(error);
    }
  }
  
  async editUser (req, res, next) {
    try {
      const { username, email, password, isVerified, googleId, provider } = req.body;
      const command = new Commands.EditUserCommand(req.query.id, req.user.id, username, email, password, isVerified, googleId, provider);
      const result = await this.CommandBus.execute(command);
      res.json(result);
      
    } catch (error) {
      logger.error(`Error editing todo by id: ${error.message}`);
      next(error);
    }
  }

  async findUser(req, res, next) {
    try {
      const query = new Queries.FindUserQuery(req.query.id);
      const user = await this.QueryBus.execute(query);
      if (!user) {
        throw new Error(`No user found with id: ${req.query.id}`);
      }
      res.json(user);
    } catch (error) {
      logger.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }



  async getUser (req, res, next) {
    
    try {
      
      const query = new Queries.GetUserQuery(req.query.id);
      const result = await this.QueryBus.execute(query);
      res.json(result);
      
    } catch (error) {
      logger.error(`Error getting user by id: ${error.message}`);
      next(error);
    }
  }
  
  async getAllUsers(req, res, next) {
    try 
    {
      const query = new Queries.GetAllUsersQuery();
      const result = await this.QueryBus.execute(query);
      res.json(result);
    } 
    catch (error) {
      logger.error(`Error getting users: ${error.message}`);
      next(error);
    }
  }

}


module.exports = UserController;



// res.status(error.status || 500).send(error.message);

// async findUsers (req, res){
  //   const { userName, email } = req.query;
  //   const allUsers = await userData.find({});
  //   const allAvailableUsers = allUsers.filter(
  //     user =>
  //       user._id.toString() !== req.user._id.toString() &&
  //       user.visiblePublic === true
  //   );
  //   req.query.userName || req.query.email
  //     ? res.json(
  //         formatedDataArray(
  //           allAvailableUsers.filter(
  //             user =>
  //               (userName && stringContainAnother(user.userName, userName)) ||
  //               (email && user.email === email)
  //           )
  //         )
  //       )
  //     : res.json(formatedDataArray(allAvailableUsers));
  // };

  // async isUserExists (req, res) {
  //   try {
  //     const { emailAddress } = request.body;
  //     const foundedUser = await this.userService.findUser({
  //       emailAddress
  //     });
  //     if (foundedUser) {
  //       request.body.hash = foundedUser.password;
  //     }
  //     return !!foundedUser;
  //   } catch (error) {
  //     response.status(500).json({ error: error.message });
  //   }
  // };

  //Pending
  // async isEmailUsed(req, res, next) {
  //   if (await isUserExists(req)) {
  //     res.status(500).json({
  //       error: `This e-mail address ${req.body.email} was used!`
  //     });
  //   } else {
  //     next();
  //   }
  // }