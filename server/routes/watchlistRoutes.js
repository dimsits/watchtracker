const express = require('express');
const router = express.Router();
const {
  addToWatchlist,
  markAsWatched,
  getUserWatchlist,
  likeMovie,
  unlikeMovie,
  deleteFromWatchlist, // Import the controller
} = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure the correct path

// Use the authMiddleware for all watchlist routes
router.use(authMiddleware);

router.post('/add', addToWatchlist);
router.post('/watched', markAsWatched);
router.get('/userWatchlist', getUserWatchlist);
router.post('/like', likeMovie);
router.post('/unlike', unlikeMovie);
router.delete('/remove', deleteFromWatchlist); 

module.exports = router;
