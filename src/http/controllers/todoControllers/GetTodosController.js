import BaseController from "./TodoBaseController"; 

export class GetTodosController extends BaseController{
    
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
      super.execute(dbRepository);
      
      const { pageNumber, pageLimit } = req.query;
      
      const query = new Queries.GetTodosQuery(pageNumber, pageLimit);
      const result = await this.QueryBus.execute(query);
      res.json(result);
    } 
    catch (error) {
      logger.error(`Error getting todos: ${error.message}`);
      next(error);
    }
  }
}