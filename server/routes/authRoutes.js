const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middleware/validationMiddleware');

const router = express.Router();

// Validation rules for registration
const registerValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .matches(/\d/).withMessage('Password must contain a number')
];

// Validation rules for login
const loginValidation = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('Password is required')
];

// Public Routes with Validation
router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);

// Protected Routes
router.post('/logout', authMiddleware, logoutUser);
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ 
        message: 'Protected Route', 
        user: req.user 
    });
});

module.exports = router;
