import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import ExpandedMovieCard from "../components/ExpandedMovieCard";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";
import useAuthStore from "../store/authStore";
import axios from "axios";

// Shuffle utility function
const shuffleMovies = (moviesArray) => {
  const shuffledArray = [...moviesArray];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [movies, setMovies] = useState([]);

  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/watchlist/userWatchlist", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const data = response.data;
          const unwatchedMovies = data.filter((movie) => !movie.watched);
          const sortedData = unwatchedMovies.sort(
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

    fetchWatchlist();
  }, [isAuthenticated, token]);

  const handleMarkSeen = async (id) => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch("http://localhost:5000/api/watchlist/watched", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: id }),
      });

      if (response.ok) {
        setMovies((prevMovies) => prevMovies.filter((item) => item.movie_id !== id));
        setExpandedMovieId(null);
      } else {
        console.error("Failed to mark as watched");
      }
    } catch (error) {
      console.error("Error marking as watched:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) return;
    try {
      const response = await fetch("http://localhost:5000/api/watchlist/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movie_id: id }),
      });

      if (response.ok) {
        setMovies((prevMovies) => prevMovies.filter((item) => item.movie_id !== id));
        setExpandedMovieId(null);
      } else {
        console.error("Failed to delete from watchlist");
      }
    } catch (error) {
      console.error("Error deleting from watchlist:", error);
    }
  };

  const handleExpand = (id) => {
    setExpandedMovieId(id === expandedMovieId ? null : id);
  };

  const filteredMovies = movies.filter((item) =>
    item.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsSearching(searchQuery !== "");
  }, [searchQuery]);

  const expandedMovie = movies.find((item) => item.movie_id === expandedMovieId);

  const recentlyAddedMovies = movies.slice(0, 20); // Keep recently added as is
  const shuffledMovies = shuffleMovies(filteredMovies); // Shuffle All Movies only

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

        {/* Recently Added Section */}
        {recentlyAddedMovies.length > 0 && !isSearching && (
          <section className="mb-8">
          <div className="flex items-center mb-6">
            <div className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            <h2
              className={`text-2xl font-bold px-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Recently Added
            </h2>
            <div className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
          </div>
          <div className="relative group">
            {/* Scrollable Row */}
            <div className="flex gap-4 overflow-x-auto scrollbar-hide recently-added-scroll">
              {recentlyAddedMovies.map((item) => (
                <MovieCard
                  key={item.movie.movie_id}
                  movie={{
                    ...item.movie,
                    watched: item.watched,
                    notes: item.notes,
                  }}
                  onMarkSeen={handleMarkSeen}
                  onDelete={handleDelete}
                  onExpand={handleExpand}
                  isExpanded={item.movie.movie_id === expandedMovieId}
                />
              ))}
            </div>
        
            {/* Left Arrow Button */}
            <button
              onClick={() => {
                const scrollContainer = document.querySelector(".recently-added-scroll");
                if (scrollContainer) scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ←
            </button>
        
            {/* Right Arrow Button */}
            <button
              onClick={() => {
                const scrollContainer = document.querySelector(".recently-added-scroll");
                if (scrollContainer) scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </button>
          </div>
        </section>
        )}

        {/* All Movies Section */}
        <section>
          <div className="flex items-center mb-6">
            <div
              className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
            ></div>
            <h2
              className={`text-2xl font-bold px-4 ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              All Movies
            </h2>
            <div
              className={`flex-grow h-[2px] ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}
            ></div>
          </div>
          <div className="flex flex-wrap justify-start gap-4 px-7">
            {shuffledMovies.map((item) => (
              <MovieCard
                key={item.movie.movie_id}
                movie={{
                  ...item.movie,
                  watched: item.watched,
                  notes: item.notes,
                }}
                onMarkSeen={handleMarkSeen}
                onDelete={handleDelete}
                onExpand={handleExpand}
                isExpanded={item.movie.movie_id === expandedMovieId}
              />
            ))}
          </div>
        </section>
      </main>

      {expandedMovie && (
        <ExpandedMovieCard
          movie={{
            ...expandedMovie.movie,
            watched: expandedMovie.watched,
            notes: expandedMovie.notes,
          }}
          onMarkSeen={handleMarkSeen}
          onDelete={handleDelete}
          onCollapse={() => setExpandedMovieId(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
