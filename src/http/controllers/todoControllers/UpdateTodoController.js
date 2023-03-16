import BaseController from "./TodoBaseController"; 

export class UpdateTodoController extends BaseController{
    
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const { title, description, status } = req.body;
      
      const command = new Commands.UpdateTodoCommand(req.params.id, req.user.id, title, description, status);
      const result = await this.CommandBus.execute(command);
      res.json(result);

    } catch (error) {
      logger.error(`Error updating todo: ${error.message}`);
      next(error);
    }
  }
}