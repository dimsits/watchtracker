const express = require('express');
const rateLimit = require('express-rate-limit');
const { body, query, validationResult } = require('express-validator');
const movieController = require('../controllers/movieController');

const router = express.Router();

// Rate limiter for the /search route
const searchRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window
  message: {
    error: 'Too many search requests from this IP, please try again after a minute.',
  },
  standardHeaders: true, // Includes `RateLimit-*` headers in the response
  legacyHeaders: false, // Disables `X-RateLimit-*` headers
});

// Validation middleware
const searchValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required.')
    .isLength({ min: 2 }).withMessage('Title must be at least 2 characters long.')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Apply the rate limiter, validation, and error handling to the search route
router.post('/search', 
  searchRateLimiter,         // Rate limiting middleware
  searchValidation,          // Validation middleware
  handleValidationErrors,    // Error handling middleware for validation
  movieController.searchMoviesByTitle  // Controller logic
);

module.exports = router;
