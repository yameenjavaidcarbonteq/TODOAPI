import BaseController from "./TodoBaseController"; 

export class CreateTodoController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const { title, description, status } = req.body;
      
      const command = new Commands.CreateTodoCommand(title, description, status, 1);
      const result = await this.CommandBus.execute(command);
      res.json(result);
    
    } catch (error) {
      logger.error(`Error creating todo: ${error.message}`);
      next(error);
    }
  }
}