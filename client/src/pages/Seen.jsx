import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import useAuthStore from "../store/authStore"; // Import your auth store
import axios from "axios";

function Seen() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

  // Access token and auth status from the store
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only fetch the watchlist if the user is authenticated
    if (!isAuthenticated) {
      return;
    }

    const fetchSeenMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/watchlist/userWatchlist", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;

          // Filter movies to include only those with watched = true
          const seenMovies = data.filter((item) => item.watched === true);

          // Fetch user review for each movie
          const moviesWithReviews = await Promise.all(
            seenMovies.map(async (movie) => {
              try {
                const reviewResponse = await axios.get(
                  `http://localhost:5000/api/reviews/user-review/${movie.movie_id}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                // Add userRating to the movie if review exists
                if (reviewResponse.status === 200) {
                  return {
                    ...movie,
                    userRating: reviewResponse.data.rating, // Assuming the API response contains a `rating` field
                  };
                }
              } catch (error) {
                console.error(`No review found for movie ID: ${movie.movie_id}`);
              }
              // Return the movie as is if no review exists
              return { ...movie, userRating: 0 };
            })
          );

          // Sort by createdAt descending
          const sortedData = moviesWithReviews.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );

          setMovies(sortedData);
        } else {
          console.error("Failed to fetch watchlist");
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchSeenMovies();
  }, [isAuthenticated, token]);

  const handleExpand = (id) => {
    setExpandedMovieId(id === expandedMovieId ? null : id);
  };

  const handleAddReview = async ({ movieId, rating }) => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: movieId, rating }),
      });

      if (response.ok) {
        alert("Review added successfully!");
        updateLocalReview(movieId, rating);
      } else {
        const errorData = await response.json();
        console.error("Failed to add review:", errorData);
        alert(errorData.message || "Error adding review.");
      }
    } catch (error) {
      console.error("Error adding review:", error);
      alert("Failed to add review. Please try again later.");
    }
  };

  const handleUpdateReview = async ({ movieId, rating }) => {
    try {
      const response = await fetch("http://localhost:5000/api/reviews/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: movieId, rating }),
      });

      if (response.ok) {
        alert("Review updated successfully!");
        updateLocalReview(movieId, rating);
      } else {
        const errorData = await response.json();
        console.error("Failed to update review:", errorData);
        alert(errorData.message || "Error updating review.");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again later.");
    }
  };

  const handleDelete = async (movieId) => {
    try {
      const response = await fetch("http://localhost:5000/api/watchlist/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: movieId }),
      });

      if (response.ok) {
        alert("Movie removed successfully!");
        setMovies((prevMovies) => prevMovies.filter((movie) => movie.movie_id !== movieId));
      } else {
        const errorData = await response.json();
        console.error("Failed to delete movie:", errorData);
        alert(errorData.message || "Error deleting movie.");
      }
    } catch (error) {
      console.error("Error deleting movie:", error);
      alert("Failed to delete movie. Please try again later.");
    }
  };

  const updateLocalReview = (movieId, rating) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.movie_id === movieId ? { ...movie, userRating: rating } : movie
      )
    );
  };

  const filteredMovies = movies.filter((item) =>
    item.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsSearching(searchQuery !== "");
  }, [searchQuery]);

  const expandedMovie = movies.find((item) => item.movie_id === expandedMovieId);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      <Header />

      <main className="pt-20 px-4 md:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full px-4 py-2 rounded-md border ${
                isDarkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"
              } focus:outline-none focus:border-blue-500`}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Seen Movies Section */}
        {movies.length > 0 && (
          <section>
            <div className="flex items-center mb-6">
              <div className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <h2
                className={`text-2xl font-bold px-4 ${
                  isDarkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Seen Movies
              </h2>
              <div className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>
            <div className="flex flex-wrap justify-start gap-4 px-7">
              {filteredMovies.map((item) => (
                <MovieCard
                  key={item.movie_id}
                  movie={{
                    ...item.movie,
                    watched: item.watched,
                    notes: item.notes,
                    userRating: item.userRating,
                  }}
                  onExpand={handleExpand}
                  onAddReview={handleAddReview}
                  onUpdateReview={handleUpdateReview}
                  onDelete={handleDelete}
                  isExpanded={item.movie_id === expandedMovieId}
                />
              ))}
            </div>
          </section>
        )}

        {/* No Seen Movies */}
        {movies.length === 0 && !isSearching && (
          <p className={`text-center ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            You have no seen movies.
          </p>
        )}
      </main>
    </div>
  );
}

export default Seen;
