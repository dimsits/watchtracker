const {
    addReview,
    updateReview,
    getReviewsForMovie,
    deleteReview,
  } = require('../models/reviewModel');
  
  // Add a new review
  exports.addReview = async (req, res) => {
    const user_id = req.user.user_id; // Assuming auth middleware sets req.user
    const { movie_id, rating } = req.body;
  
    if (!movie_id || typeof rating !== 'number') {
      return res.status(400).json({ error: 'movie_id and rating are required' });
    }
  
    try {
      const review = await addReview(user_id, movie_id, rating);
      res.status(201).json(review);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Update an existing review
  exports.updateReview = async (req, res) => {
    const user_id = req.user.user_id;
    const { movie_id, rating } = req.body;
  
    if (!movie_id || typeof rating !== 'number') {
      return res.status(400).json({ error: 'movie_id and rating are required' });
    }
  
    try {
      const review = await updateReview(user_id, movie_id, rating);
      res.status(200).json(review);
    } catch (error) {
      console.error('Error updating review:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get reviews for a movie
  exports.getReviewsForMovie = async (req, res) => {
    const { movie_id } = req.params;
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const reviews = await getReviewsForMovie(movie_id);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete a review
  exports.deleteReview = async (req, res) => {
    const user_id = req.user.user_id;
    const { movie_id } = req.body;
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const result = await deleteReview(user_id, movie_id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting review:', error);
      res.status(500).json({ error: error.message });
    }
  };
