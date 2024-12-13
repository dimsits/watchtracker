const {
  createMovie,
  searchMoviesByTitle,
} = require('../models/movieModel');

// Create a new movie using OMDb API (and save to the database)
exports.createMovie = async (req, res) => {
  const { imdbID } = req.body;

  if (!imdbID) {
    return res.status(400).json({ error: 'imdbID is required' });
  }

  try {
    const movie = await createMovie(imdbID);

    // Check if all necessary fields from the new schema are populated
    const requiredFields = [
      'movie_id',
      'title',
      'year',
      'genre',
      'director',
      'writer',
      'actors',
      'plot',
      'language',
      'country',
      'awards',
      'poster_url',
      'imdb_rating',
      'like_count',
    ];

    for (const field of requiredFields) {
      if (!(field in movie)) {
        return res.status(500).json({ error: `Missing required field: ${field}` });
      }
    }

    res.status(201).json(movie);
  } catch (error) {
    console.error('Error creating movie:', error);
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

    // Ensure the required fields are included in the response for each movie
    const formattedMovies = movies.map((movie) => ({
      movie_id: movie.movie_id,
      title: movie.title,
      year: movie.year,
      genre: movie.genre,
      director: movie.director,
      writer: movie.writer,
      actors: movie.actors,
      plot: movie.plot,
      language: movie.language,
      country: movie.country,
      awards: movie.awards,
      poster_url: movie.poster_url,
      imdb_rating: movie.imdb_rating,
      like_count: movie.like_count,
    }));

    res.status(200).json(formattedMovies);
  } catch (error) {
    console.error('Error searching for movies:', error);
    res.status(500).json({ error: error.message });
  }
};
