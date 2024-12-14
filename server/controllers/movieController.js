const {
  createMovie,
  searchMoviesByTitle,
} = require('../models/movieModel');
const { getAverageRatingForMovie } = require('../models/reviewModel');

// Create a new movie using OMDb API (and save to the database)
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

    // Fetch average rating for each movie
    const formattedMovies = await Promise.all(
      movies.map(async (movie) => {
        const averageRating = await getAverageRatingForMovie(movie.movie_id);
        return {
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
          average_rating: averageRating || 0, // Default to 0 if no ratings
        };
      })
    );

    res.status(200).json(formattedMovies);
  } catch (error) {
    console.error('Error searching for movies:', error);
    res.status(500).json({ error: error.message });
  }
};
