const {
    addToWatchlist,
    markAsWatched,
    getUserWatchlist,
    likeMovie,
    unlikeMovie,
  } = require('../models/watchlistModel');
  
  exports.addToWatchlist = async (req, res) => {
    const { movie_id } = req.body;
    const user_id = req.user.user_id; // Assuming req.user is set from authentication middleware
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const watchlistItem = await addToWatchlist(user_id, movie_id);
      res.status(201).json(watchlistItem);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.markAsWatched = async (req, res) => {
    const { movie_id } = req.body;
    const user_id = req.user.user_id;
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const updatedItem = await markAsWatched(user_id, movie_id);
      res.status(200).json(updatedItem);
    } catch (error) {
      console.error('Error marking as watched:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.getUserWatchlist = async (req, res) => {
    const user_id = req.user.user_id;
  
    try {
      const watchlist = await getUserWatchlist(user_id);
      res.status(200).json(watchlist);
    } catch (error) {
      console.error('Error getting watchlist:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.likeMovie = async (req, res) => {
    const { movie_id } = req.body;
    const user_id = req.user.user_id;
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const like = await likeMovie(user_id, movie_id);
      res.status(200).json(like);
    } catch (error) {
      console.error('Error liking movie:', error);
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.unlikeMovie = async (req, res) => {
    const { movie_id } = req.body;
    const user_id = req.user.user_id;
  
    if (!movie_id) {
      return res.status(400).json({ error: 'movie_id is required' });
    }
  
    try {
      const result = await unlikeMovie(user_id, movie_id);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error unliking movie:', error);
      res.status(500).json({ error: error.message });
    }
  };
  