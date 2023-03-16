import BaseController from "./UserBaseController";

export class CreateTodoController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      const { username, email, password, isVerified, googleId, provider } = req.body;
      const command = new Commands.EditUserCommand(req.query.id, req.user.id, username, email, password, isVerified, googleId, provider);
      const result = await this.CommandBus.execute(command);
      res.json(result);
      
    } catch (error) {
      logger.error(`Error editing todo by id: ${error.message}`);
      next(error);
    }
  }
}