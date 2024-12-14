const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Define rate limiting for the /search route
const searchRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per window
  message: {
    error: 'Too many search requests from this IP, please try again after a minute.',
  },
  standardHeaders: true, // Includes `RateLimit-*` headers in the response
  legacyHeaders: false, // Disables `X-RateLimit-*` headers
});

// Apply the rate limiter to the search route
router.post('/search', searchRateLimiter, movieController.searchMoviesByTitle);

module.exports = router;
