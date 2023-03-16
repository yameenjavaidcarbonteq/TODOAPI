import BaseController from "../BaseController"; 

export class TokenController extends BaseController{
  constructor(req, res, next)
  {
      super(req, res, next);
  }

  async execute (dbRepository) 
  {
    try {
        super.execute(dbRepository);
        
        const { id, email } = request.user;
        logger.info(`Making Token for id ${id} and email ${email}`);
        const token = jwt.sign({ id, email}, config.jwtsecret, {
            expiresIn: 1200
        });
        
        response.json({ token: `Bearer ${token}` });
            
        } catch (error) {
            logger.error(`Error creating todo: ${error.message}`);
            next(error);
        }
    }
}