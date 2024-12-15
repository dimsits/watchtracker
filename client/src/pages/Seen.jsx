import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import useAuthStore from "../store/authStore";
import axios from "axios";

function Seen() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchSeenMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/watchlist/userWatchlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;

          const seenMovies = data.filter((item) => item.watched === true);

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

                if (reviewResponse.status === 200) {
                  return {
                    ...movie,
                    userRating: reviewResponse.data.rating,
                  };
                }
              } catch (error) {
                console.error(`No review found for movie ID: ${movie.movie_id}`);
              }
              return { ...movie, userRating: 0 };
            })
          );

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: movieId, rating }),
      });

      if (response.ok) {
        alert("Review added successfully!");
        updateLocalReview(movieId, rating);
        await fetchAndUpdateAverage(movieId);
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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: movieId, rating }),
      });

      if (response.ok) {
        alert("Review updated successfully!");
        updateLocalReview(movieId, rating);
        await fetchAndUpdateAverage(movieId);
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
          Authorization: `Bearer ${token}`,
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

  // Fetch updated average rating from the server and update local state
  const fetchAndUpdateAverage = async (movieId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reviews/Average/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedAverage = response.data.average_rating;
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.movie_id === movieId
            ? { ...movie, movie: { ...movie.movie, average_rating: updatedAverage } }
            : movie
        )
      );
    } catch (error) {
      console.error("Failed to fetch updated average rating:", error);
    }
  };

  const filteredMovies = movies.filter((item) =>
    item.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsSearching(searchQuery !== "");
  }, [searchQuery]);

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
                  onExpand={() => {}}
                  onAddReview={handleAddReview}
                  onUpdateReview={handleUpdateReview}
                  onDelete={handleDelete}
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
