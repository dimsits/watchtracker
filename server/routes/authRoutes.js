const express =  require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);  
router.post('/logout', authMiddleware, logoutUser);

// Protected Routes
router.get('/profile', authMiddleware, (req, res) => {
    res.json({ 
        message: 'Protected Route', 
        user: req.user 
    });
});


module.exports = router;
