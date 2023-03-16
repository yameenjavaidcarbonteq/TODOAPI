import BaseController from "./TodoBaseController"; 

export class DeleteTodoController extends BaseController{
    
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const command = new Commands.DeleteTodoCommand(req.params.id);
      const result = await this.CommandBus.execute(command);
      res.json(result);

    } catch (error) {
      logger.error(`Error deleting todo: ${error.message}`);
      next(error);
    }
  }
}