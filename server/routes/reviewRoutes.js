const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  addReview,
  updateReview,
  getReviewsForMovie,
  deleteReview,
  getUserReview
} = require('../controllers/reviewController');

// All review routes require authentication
router.use(authMiddleware);

// Add a new review
router.post('/add', addReview);

// Update an existing review
router.put('/update', updateReview);

// Get all reviews for a specific movie
router.get('/movie/:movie_id', getReviewsForMovie);

// Delete a review
router.delete('/delete', deleteReview);

router.get('/user-review/:movie_id', getUserReview);

module.exports = router;
