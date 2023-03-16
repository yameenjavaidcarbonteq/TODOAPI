import BaseController from "./TodoBaseController"; 

export class TodoBaseController extends BaseController{
    
    constructor(req, res, next)
    {
        super(req, res, next);
    }

    async execute(dbRepository)
    {
        
        this.todoService = new service(dbRepository);
        
        logger.info(`Creating Command handlers for Todos `);
        const createTodoHandler = new CommandBus_handler.CreateTodoHandler(this.todoService);
        const updateTodoHandler = new CommandBus_handler.UpdateTodoHandler(this.todoService);
        const deleteTodoHandler = new CommandBus_handler.DeleteTodoHandler(this.todoService);
        logger.info(`Creating Query handlers for Todos `);
        const getTodoByIdHandler = new QueryBus_handler.GetTodoByIdHandler(this.todoService);
        const getTodosHandler = new QueryBus_handler.GetTodosHandler(this.todoService);
        
        logger.info(`Initiating Command Bus for Todos`);
        this.CommandBus = new CommandBus();

        logger.info(`Initiating Query Bus for Todos`);
        this.QueryBus = new QueryBus();
        
        logger.info(`Registering command and their handlers to Query Bus for Todos `)
        this.CommandBus.register(CreateTodoCommand.name, createTodoHandler);
        this.CommandBus.register(UpdateTodoCommand.name, updateTodoHandler);
        this.CommandBus.register(DeleteTodoCommand.name, deleteTodoHandler);
        
        logger.info(`Registering queries and their handlers to Query Bus for Todos `)
        this.QueryBus.register(Queries.GetTodosQuery.name, getTodosHandler);
        this.QueryBus.register(Queries.GetTodoByIdQuery.name, getTodoByIdHandler);

    }
}