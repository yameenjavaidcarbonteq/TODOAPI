import BaseController from "./UserBaseController";

export class RegisterUserController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      const {
        email,
        username,
        password,
      } = request.body;
      
      if (!password) {
        throw { message: "Please type all required data!", status: 400 };
      }

      
      const command = new Commands.CreateUserCommand(username, email, password, true, null, 'email');
      const createdUser = await this.CommandBus.execute(command);
      
      request.user = {
        id: createdUser.id,
        email: createdUser.email
      };
      next();
    } catch (error) {
      response.status(error.status || 500).send(error.message);
    }
  };
}