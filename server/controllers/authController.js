const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, getUserByUsername, createUser } = require('../models/userModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

async function registerUser(req, res) {
    const { username, name, email, password } = req.body;

    if (!username || !email || !name || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ username, name, email, role: "user", password: hashedPassword });

        res.status(201).json({ message: 'User registered', user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to register' });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign({ user_id: user.user_id, email: user.email,role: user.role }, JWT_SECRET, { expiresIn: '3h' });
        res.status(200).json({ message: 'User logged in', token , user: {
            user_id: user.user_id,
            username: user.username,
            name: user.name,
            email: user.email,
            role: user.role
        } }); 
    } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
    }
}

const tokenBlacklist = new Set();

async function logoutUser(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Add token to blacklist
        tokenBlacklist.add(token);
        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to logout' });
    }
}

// Middleware to check token blacklist
function isTokenBlacklisted(token) {
    return tokenBlacklist.has(token);
}

module.exports = { registerUser, loginUser, logoutUser, isTokenBlacklisted };

