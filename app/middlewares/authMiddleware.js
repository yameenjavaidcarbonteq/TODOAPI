const authMiddleware = async (req, res, next) => {
    const { username, password } = req.body;
    if (username === 'user' && password === 'pass') {
        next();
    } else {
        res.status(401).send({ error: 'Invalid username or password' });
    }
};

module.exports = authMiddleware;