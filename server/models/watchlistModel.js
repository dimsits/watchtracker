const prisma = require('../db/prisma'); // Ensure correct path

// Add a movie to the user's watchlist
async function addToWatchlist(user_id, movie_id) {
  // Check if the movie exists
  const movie = await prisma.movies.findUnique({ where: { movie_id } });
  if (!movie) {
    throw new Error('Movie not found');
  }

  // Check if the watchlist entry already exists
  const existingWatchlistItem = await prisma.watchlist.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  if (existingWatchlistItem) {
    throw new Error('Movie already in watchlist');
  }

  const watchlistItem = await prisma.watchlist.create({
    data: {
      user_id,
      movie_id,
    },
    include: {
      movie: true,
    },
  });

  return watchlistItem;
}

// Mark a movie as watched
async function markAsWatched(user_id, movie_id) {
  const watchlistItem = await prisma.watchlist.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  if (!watchlistItem) {
    throw new Error('Watchlist item not found');
  }

  const updatedItem = await prisma.watchlist.update({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
    data: {
      watched: true,
    },
    include: {
      movie: true,
    },
  });

  return updatedItem;
}

// Get a user's watchlist with movie info and review stats
async function getUserWatchlist(user_id) {
  const watchlistItems = await prisma.watchlist.findMany({
    where: { user_id },
    include: {
      movie: {
        select: {
          movie_id: true,
          title: true,
          year: true,
          genre: true,
          director: true,
          writer: true,
          actors: true,
          plot: true,
          language: true,
          country: true,
          awards: true,
          poster_url: true,
          imdb_rating: true,
        },
      },
    },
  });

  // Extract all movie_ids from watchlist
  const movieIds = watchlistItems.map(item => item.movie_id);

  // Fetch review statistics for these movies
  const ratingsData = await prisma.review.groupBy({
    by: ['movie_id'],
    where: { movie_id: { in: movieIds } },
    _avg: { rating: true },
    _count: { rating: true },
  });

  // Create a map for quick lookup of stats
  const ratingMap = {};
  for (const r of ratingsData) {
    ratingMap[r.movie_id] = {
      avgRating: r._avg.rating || 0,
      reviewCount: r._count.rating,
    };
  }

  // Transform data to include watchlist fields, movie details, and review stats
  const formattedWatchlist = watchlistItems.map(item => {
    const { avgRating = 0, reviewCount = 0 } = ratingMap[item.movie_id] || {};
    return {
      watchlist_id: item.watchlist_id,
      user_id: item.user_id,
      movie_id: item.movie_id,
      watched: item.watched,
      notes: item.notes,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      movie: {
        movie_id: item.movie.movie_id,
        title: item.movie.title,
        year: item.movie.year,
        genre: item.movie.genre,
        director: item.movie.director,
        writer: item.movie.writer,
        actors: item.movie.actors,
        plot: item.movie.plot,
        language: item.movie.language,
        country: item.movie.country,
        awards: item.movie.awards,
        poster_url: item.movie.poster_url,
        imdb_rating: item.movie.imdb_rating,
        average_rating: avgRating,     
        review_count: reviewCount,     
      },
    };
  });

  return formattedWatchlist;
}

// Delete a movie from the user's watchlist
async function deleteFromWatchlist(user_id, movie_id) {
  // Check if the watchlist entry exists
  const existingWatchlistItem = await prisma.watchlist.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  if (!existingWatchlistItem) {
    throw new Error('Watchlist item not found');
  }

  // Delete the watchlist item
  await prisma.watchlist.delete({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  return { message: 'Movie removed from watchlist' };
}

module.exports = {
  addToWatchlist,
  markAsWatched,
  getUserWatchlist,
  deleteFromWatchlist,
};
