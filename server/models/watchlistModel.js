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
  });

  return updatedItem;
}

// Get a user's watchlist
async function getUserWatchlist(user_id) {
  const watchlist = await prisma.watchlist.findMany({
    where: { user_id },
    include: {
      movie: true,
    },
  });
  return watchlist;
}

// Add a like to a movie by a user
async function likeMovie(user_id, movie_id) {
  // Check if user already liked the movie
  const existingLike = await prisma.like.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  if (existingLike) {
    throw new Error('User already liked this movie');
  }

  // Create the like
  const like = await prisma.like.create({
    data: { user_id, movie_id },
  });

  // Increment like_count on the movie
  await prisma.movies.update({
    where: { movie_id },
    data: {
      like_count: { increment: 1 },
    },
  });

  return like;
}

// Unlike a movie
async function unlikeMovie(user_id, movie_id) {
  const existingLike = await prisma.like.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  if (!existingLike) {
    throw new Error('Like not found');
  }

  await prisma.like.delete({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  // Decrement like_count on the movie
  await prisma.movies.update({
    where: { movie_id },
    data: {
      like_count: { decrement: 1 },
    },
  });

  return { message: 'Movie unliked' };
}

module.exports = {
  addToWatchlist,
  markAsWatched,
  getUserWatchlist,
  likeMovie,
  unlikeMovie,
};
