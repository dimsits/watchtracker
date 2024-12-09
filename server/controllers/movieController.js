const {
  createMovie,
  searchMoviesByTitle,
} = require('../models/movieModel');

// Create a new movie using OMDb API (and save to database)
exports.createMovie = async (req, res) => {
  const { imdbID } = req.body;
  
  if (!imdbID) {
    return res.status(400).json({ error: 'imdbID is required' });
  }

  try {
    const movie = await createMovie(imdbID);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search for movies by title (check database first, then use OMDb if not found)
exports.searchMoviesByTitle = async (req, res) => {
  const { title } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required in the request body' });
  }

  try {
    const movies = await searchMoviesByTitle(title);
    if (movies.length === 0) {
      return res.status(404).json({ message: 'No movies found' });
    }
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
