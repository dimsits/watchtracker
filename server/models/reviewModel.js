const prisma = require('../db/prisma'); // Update path if needed

// Add a new review for a movie by a user
async function addReview(user_id, movie_id, rating) {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  // Check if the movie exists
  const movieExists = await prisma.movies.findUnique({ where: { movie_id } });
  if (!movieExists) {
    throw new Error('Movie not found');
  }

  // Check if review already exists
  const existingReview = await prisma.review.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });
  if (existingReview) {
    throw new Error('User has already reviewed this movie.');
  }

  // Create the review
  const review = await prisma.review.create({
    data: {
      user_id,
      movie_id,
      rating,
    },
  });

  return review;
}

// Update an existing review
async function updateReview(user_id, movie_id, rating) {
  // Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  // Check if review exists
  const existingReview = await prisma.review.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });
  if (!existingReview) {
    throw new Error('Review not found');
  }

  const updatedReview = await prisma.review.update({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
    data: {
      rating,
    },
  });

  return updatedReview;
}

// Get all reviews for a given movie
async function getReviewsForMovie(movie_id) {
  const reviews = await prisma.review.findMany({
    where: { movie_id },
    include: {
      user: {
        select: { username: true, name: true },
      },
    },
  });
  return reviews;
}

// Delete a review by user_id and movie_id
async function deleteReview(user_id, movie_id) {
  const existingReview = await prisma.review.findUnique({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });
  if (!existingReview) {
    throw new Error('Review not found');
  }

  await prisma.review.delete({
    where: {
      user_id_movie_id: { user_id, movie_id },
    },
  });

  return { message: 'Review deleted' };
}

async function getAverageRatingForMovie(movie_id) {
    if (!movie_id) {
      throw new Error('movie_id is required');
    }
  
    try {
      const averageRating = await prisma.review.aggregate({
        where: { movie_id },
        _avg: {
          rating: true,
        },
      });
  
      return averageRating._avg.rating || 0; // Default to 0 if no ratings
    } catch (error) {
      console.error('Error fetching average rating:', error);
      throw error;
    }
  }

module.exports = {
  addReview,
  updateReview,
  getReviewsForMovie,
  deleteReview,
  getAverageRatingForMovie,
};
