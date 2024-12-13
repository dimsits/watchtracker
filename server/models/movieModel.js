// Import necessary modules
const axios = require('axios');
const prisma = require('../db/prisma'); // Ensure the path is correct
require('dotenv').config(); // Load environment variables

// OMDb API configuration
const OMDB_API_KEY = process.env.OMDB_API_KEY; // Ensure this is set in your .env file
const OMDB_BASE_URL = 'http://www.omdbapi.com/';

// Function to fetch movie data from OMDb API
const fetchMovieFromOmdb = async (query, isId = false) => {
  try {
    if (!OMDB_API_KEY) {
      throw new Error('OMDB_API_KEY is not set in environment variables');
    }

    const params = {
      apikey: OMDB_API_KEY,
    };

    if (isId) {
      params.i = query; // IMDb ID
    } else {
      params.s = query; // Movie title search
    }

    const response = await axios.get(OMDB_BASE_URL, { params });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'OMDb API error');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching movie from OMDb:', error);
    throw new Error('Failed to fetch movie data from OMDb');
  }
};

// Function to map OMDb data to Prisma Movie model
const mapOmdbToPrisma = (movieData) => ({
  movie_id: movieData.imdbID || '', // Use OMDb's IMDb ID for `movie_id`
  title: movieData.Title || 'N/A',
  year: movieData.Year || 'N/A',
  genre: movieData.Genre || 'N/A',
  director: movieData.Director || 'N/A',
  writer: movieData.Writer || 'N/A',
  actors: movieData.Actors || 'N/A',
  plot: movieData.Plot || 'N/A',
  language: movieData.Language || 'N/A',
  country: movieData.Country || 'N/A',
  awards: movieData.Awards || 'N/A',
  poster_url: movieData.Poster || '',
  imdb_rating: parseFloat(movieData.imdbRating) || 0.0,
  like_count: 0, // Default value for new movies
});

// Create a new movie in the database using IMDb ID
const createMovie = async (movieId) => {
  try {
    // Fetch movie data from OMDb using IMDb ID
    const movieData = await fetchMovieFromOmdb(movieId, true);

    // Map the response data to Prisma model
    const movie = await prisma.movies.create({
      data: mapOmdbToPrisma(movieData),
    });

    return movie;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw new Error('Failed to create movie');
  }
};

// Search movies by title (partial match) and fetch from OMDb API if not in DB
const searchMoviesByTitle = async (title) => {
  try {
    // First, check if the movies exist in the database
    const existingMovies = await prisma.movies.findMany({
      where: {
        title: {
          contains: title, // Remove `mode: 'insensitive'` as it is unsupported
        },
      },
    });

    // If movies found in DB, return them
    if (existingMovies.length > 0) {
      return existingMovies;
    }

    // If no movies in DB, fetch from OMDb API using title search
    const movieData = await fetchMovieFromOmdb(title, false);

    if (!movieData.Search || movieData.Search.length === 0) {
      throw new Error('No movies found with the given title');
    }

    // For each search result, fetch detailed data and prepare for DB insertion
    const moviesToCreate = await Promise.all(
      movieData.Search.map(async (movie) => {
        try {
          const detailedData = await fetchMovieFromOmdb(movie.imdbID, true);
          return mapOmdbToPrisma(detailedData);
        } catch (err) {
          console.error(`Failed to fetch details for IMDb ID ${movie.imdbID}:`, err);
          return null; // Skip if failed to fetch details
        }
      })
    );

    // Filter out any null entries due to failed fetches
    const validMovies = moviesToCreate.filter((movie) => movie !== null);

    if (validMovies.length === 0) {
      throw new Error('No valid movie details fetched from OMDb');
    }

    // Create movies in the database
    await prisma.movies.createMany({
      data: validMovies,
      skipDuplicates: true, // Skips creating duplicates based on unique constraints
    });

    // Fetch and return the newly created movies
    const newMovies = await prisma.movies.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });

    return newMovies;
  } catch (error) {
    console.error('Error searching movies by title:', error);
    throw new Error('Failed to search movies');
  }
};


module.exports = {
  createMovie,
  searchMoviesByTitle,
};
