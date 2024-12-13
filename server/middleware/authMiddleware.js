const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Mock function to check token blacklist (replace with actual implementation)
const isTokenBlacklisted = (token) => {
    // Example: Check from Redis, database, or in-memory store
    // return blacklist.has(token);
    return false; // Replace with actual check
};

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    // Check if token is blacklisted
    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ error: 'Token has been invalidated' });
    }

    try {
        // Verify token
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user; // Attach user info to request
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired' });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        } else {
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}

module.exports = authMiddleware;
