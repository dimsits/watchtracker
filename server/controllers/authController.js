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
    } catch (error) {
            res.status(500).json({ error: 'Failed to login' });
    }
}

module.exports = { registerUser, loginUser };

