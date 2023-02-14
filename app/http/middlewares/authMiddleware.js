const authMiddleware = (req, res, next) => {
    if (!req.session.user) 
        return res.status(401).send('Not authorized');
        // res.render('login', { title: 'Login' });
    next();
}; 

module.exports = authMiddleware;