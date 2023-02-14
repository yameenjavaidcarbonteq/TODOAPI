const authMiddleware = (req, res, next) => {
    if (!req.session.user) 
        return res.status(401).json({"Auth": 'Not authorized'});
    next();
}; 

module.exports = authMiddleware;

/*
    
    Middleware functions are functions that have access to the request object (req), 
    the response object (res), and the next middleware function in the application’s 
    request-response cycle. 
    The next middleware function is commonly denoted by a variable named next.

    Middleware functions can perform the following tasks:

    Execute any code.
    Make changes to the request and the response objects.
    End the request-response cycle.
    Call the next middleware in the stack.

    Types of express middleware

    Application level middleware app.use
    Router level middleware router.use
    Built-in middleware express.static,express.json,express.urlencoded
    Error handling middleware app.use(err,req,res,next)
    Thirdparty middleware bodyparser,cookieparser

    Application Level Middleware
    
    Auth middleware

    Suppose we are having five routes getUsers,getDetails,updateDetails,isLoggedIn,isLoggedOut
    every route must be authenticated if the user is not authenticated then he is not able to call the above mentioned routes,so every GET,POST calls required authentication.In this case we build a authtication middleware.

    Now once the request comes the auth middleware will do some authentication logic that we have 
    written inside it.Once authentication successful then remaining routed must be called using next()
    if auth fails then it wont perform next route exit the middleware with error response logic

*/