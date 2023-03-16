import BaseController from "./UserBaseController"; 

export class CreateUserController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
        const { username, email, password } = req.body;
        
        const command = new Commands.CreateUserCommand(username, email, password, true, null, 'email');
        const result = await commandBus.execute(command);
        res.json(result);
      
      } catch (error) {
        logger.error(`Error creating todo: ${error.message}`);
        next(error);
      }
  }
}