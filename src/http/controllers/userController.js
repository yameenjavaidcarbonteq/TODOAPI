const { logger } = require ("@logger");

const {
    CreateUserCommand,
    UpdateUserCommand,
    DeleteUserCommand,
    GetAllUsersCommand,
    GetUserByIdCommand
} = require ("../../application/User");
const { getUserCommandBus } = require("../../application");
  
class UserController {
    constructor(dbRepository)
    {
        this.commandBus = getUserCommandBus(dbRepository);
    }
    createUser = async (req, res, next) =>
    {
        try {
            const { username, email, password } = req.body;
        
            const command = new CreateUserCommand(username, email, password);
            const result = await this.commandBus.handle(command);
            res.status(200).json(result);
        
        } catch (error) {
        logger.error(`Error creating user: ${error.message}`);
        next(error);
        }
    }
    
    getAllUsers = async (req, res, next) => 
    {
        try {
            const query = new GetAllUsersCommand();
            const result = await this.commandBus.handle(query);
            res.json(result);
        } 
        catch (error) {
        logger.error(`Error getting users: ${error.message}`);
        next(error);
        }
    }

    getUserById = async (req, res, next) =>
    {
        try {
            const command = new GetUserByIdCommand(req.params.id);
            const result = await this.commandBus.handle(command);
            res.json(result);
        } 
        catch (error) {
        logger.error(`Error getting user: ${error.message}`);
        next(error);
        }
    }
    updateUser = async (req, res, next) => {
    
        try {
            
            const { username, email, password } = req.body;
            const command = new UpdateUserCommand(req.params.id, username, email, password);
            const result = await this.commandBus.handle(command);
            res.json(result);
    
        } catch (error) {
            logger.error(`Error updating user: ${error.message}`);
            next(error);
        }
    
    }

    deleteUser = async (req, res, next) => 
    {
        try {
        const command = new DeleteUserCommand(req.params.id);
        const result = await this.commandBus.handle(command);
        res.status(200).json(result);

        } catch (error) {
        logger.error(`Error deleting user: ${error.message}`);
        next(error);
        }
    }

    logout = async (req, res, next) => 
    {
    
        try {
            req.logout((error) => {
                if (error)
                {
                  next(error)
                }
                res.json({'Message': 'Logged Out'});
            });
    
        } catch (error) {
            logger.error(`Error logging out: ${error.message}`);
            next(error);
        }
    
    }

    register = async (req, res, next) =>
    {
        try {
        const {
            email,
            username,
            password,
        } = req.body;
        
        if (!password) {
            throw new InvalidUserDataError (400, "Please type all required data!");
        }
        
        const command = new CreateUserCommand(username, email, password);
        const createdUser = await this.commandBus.handle(command);
        
        req.user = {
            id: createdUser.id,
            email: createdUser.email
        };
        next();
        } catch (error) {
            logger.error(`Error registering user: ${error.message}`);
            next(error);
        }
    }
}

module.exports = { UserController };