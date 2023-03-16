import BaseController from "./UserBaseController";

export class UserBaseController extends BaseController{


    constructor(dbRepository)
    {
        super(dbRepository);

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
}