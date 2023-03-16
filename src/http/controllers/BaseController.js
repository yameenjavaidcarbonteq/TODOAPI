export class IBaseController{


    constructor(req, res, next)
    {
        this.todoService = new service(dbRepository);
    }
    
    async execute(dbRepository)
    {
        
    }
    
    async handleResult(result) {
        if (result.success) {
          return this.ok(result.statusCode, result.responseBody);
        }
        return this.handleErrors?.(result.error);
    }
    
    ok(statusCode, value) {
        return this.response ?.status(statusCode).json({ success: true, result: value });
    }
}