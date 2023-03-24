const {logger} = require("@logger");

const {
    CreateTodoCommand,
    UpdateTodoCommand,
    DeleteTodoCommand,
    GetAllTodosCommand,
    GetTodoByIdCommand
} = require ("../../application/Todo/todoCommands");

const { getTodoCommandBus } = require("../../application/CommandBus/commandBus");

class TodoController {
    constructor(dbRepository)
    {
        this.commandBus = getTodoCommandBus(new UserService(dbRepository));
    }
    
    GetAllTodos = async (req, res, next) => {
        try {
        const { pageNumber, pageLimit ,q} = req.query;
            
        const command = new GetAllTodosCommand(pageNumber, pageLimit);
        console.log(this.commandBus);
        const result = await this.commandBus.handle(command);
        res.status(200).json(result);
        } 
        catch (error) {
        logger.error(`Error getting todos: ${error.message}`);
        next(error);
        }
    }
    
    
    CreateTodo = async (req, res, next) => 
    {
        try {
        const { title, description, status } = req.body;
        
        const command = new CreateTodoCommand(title, description, status, 1);
        const result = await this.commandBus.handle(command);
        res.status(200).json(result);
        
        } catch (error) {
        logger.error(`Error creating todo: ${error.message}`);
        next(error);
        }
    }


    DeleteTodo = async (req, res, next) =>
    {
        try {
        const command = new DeleteTodoCommand(req.params.id);
        const result = await this.commandBus.handle(command);
        res.status(200).json(result);

        } catch (error) {
        logger.error(`Error deleting todo: ${error.message}`);
        next(error);
        }
    }

    GetTodoById = async (req, res, next) =>
    {
        try {
        const command = new GetTodoByIdCommand(req.params.id);
        const result = await this.commandBus.handle(command);
        res.status(200).json(result);
        } 
        catch (error) {
        logger.error(`Error getting todos: ${error.message}`);
        next(error);
        }
    }
    UpdateTodo = async (req, res, next) => {
    
        try {
            const { title, description, status } = req.body;
            
            const command = new UpdateTodoCommand(req.params.id, title, description, status, 1);
            const result = await this.commandBus.handle(command);
            res.status(200).json(result);
    
        } catch (error) {
            logger.error(`Error updating todo: ${error.message}`);
            next(error);
        }
    }
}


module.exports = { 
    TodoController 
};