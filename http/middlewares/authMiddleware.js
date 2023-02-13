const authMiddleware = (req, res, next) => {
    console.log("Came Here");
    if (!req.session.user) 
        return res.status(401).send('Not authorized');
    next();
}; 

module.exports = authMiddleware;