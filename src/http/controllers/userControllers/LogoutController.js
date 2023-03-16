import BaseController from "./UserBaseController";

export class LogoutController extends BaseController{
  constructor(req, res, next)
  {
    super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
        req.logout((error) => {
            if (error)
            {
              next(error)
            }
            res.json({'Message': 'Logged Out'});
        });
      
      } catch (error) {
        logger.error(`Error creating todo: ${error.message}`);
        next(error);
      }
  }
}