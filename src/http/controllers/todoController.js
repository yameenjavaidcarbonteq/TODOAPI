const {logger} = require("@logger");

const {
    CreateTodoCommand,
    UpdateTodoCommand,
    DeleteTodoCommand,
    GetAllTodosCommand,
    GetTodoByIdCommand
} = require ("../../application/Todo");

const { getTodoCommandBus } = require("../../application/utils/commandBus");

class TodoController {
    constructor(dbRepository)
    {
        this.commandBus = getTodoCommandBus(dbRepository);
    }
    
    GetAllTodos = async (req, res, next) => {
        try {
        const { pageNumber, pageLimit ,q} = req.query;
            
        const command = new GetAllTodosCommand(pageNumber, pageLimit);
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
        
        const command = new CreateTodoCommand(title, description, status, req.user.id);
        const result = await this.commandBus.handle(command);
        console.log("Result: ",result);
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
        logger.error(`Error getting todo: ${error.message}`);
        next(error);
        }
    }
    UpdateTodo = async (req, res, next) => {
    
        try {
            const { title, description, status } = req.body;
            
            const command = new UpdateTodoCommand(req.params.id, title, description, status, req.user.id);
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