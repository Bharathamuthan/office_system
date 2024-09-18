const jwt = require('jsonwebtoken');
const config = require('config');
require('dotenv').config;

const authMiddleware = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;  // Attach user information to the request object
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;