import BaseController from "./UserBaseController";

export class GetAllUsersController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const query = new Queries.GetAllUsersQuery();
      const result = await this.QueryBus.execute(query);
      res.json(result);
    } 
    catch (error) {
      logger.error(`Error getting users: ${error.message}`);
      next(error);
    }
  }
}