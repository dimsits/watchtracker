const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Route to create a movie (using IMDB ID to fetch from OMDb)
router.post('/create', movieController.createMovie);

// Route to search movies by title (either in DB or fetch from OMDb)
router.post('/search', movieController.searchMoviesByTitle);

module.exports = router;
