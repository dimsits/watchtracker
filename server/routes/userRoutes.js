// userRoutes.js (new file)
const express = require('express');
const { editUserProfile } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.put('/edit', authMiddleware, editUserProfile);

module.exports = router;
