import BaseController from "./TodoBaseController"; 
 
export class GetTodoController extends BaseController{
    
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const query = new Queries.GetTodoByIdQuery(req.params.id);
      const result = await this.QueryBus.execute(query);
      res.json(result);

    } catch (error) {
      logger.error(`Error getting todo by id: ${error.message}`);
      next(error);
    }
  }
}