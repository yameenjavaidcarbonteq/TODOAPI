import BaseController from "./UserBaseController";

export class GetUserController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const query = new Queries.GetUserQuery(req.query.id);
      const result = await this.QueryBus.execute(query);
      res.json(result);
      
    } catch (error) {
      logger.error(`Error getting user by id: ${error.message}`);
      next(error);
    }
  }
}