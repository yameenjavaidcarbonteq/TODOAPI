const jwt = require('jsonwebtoken');
const { logger } = require('@logger');
const { config } = require('@config');

class TokenController{
    constructor()
    {
    
    }

    static sendToken = (req, res, next) => 
    {
        try { 
            const { id, email } = req.user;
            logger.info(`Making Token for id ${id} and email ${email}`);
            const token = jwt.sign({ id, email}, config.jwtsecret, {
            expiresIn: 1200
            });
            res.json({ token: `Bearer ${token}` });
        
        } 
        catch (error) 
        {
            logger.error(`${error.message}`);
            next(new JWTGenerateError(
                400,
                "Internal Server Error"
            ));
        }
    }
}


module.exports = {
    TokenController
};