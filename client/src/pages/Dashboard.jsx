import React, { useState, useRef, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import ExpandedMovieCard from "../components/ExpandedMovieCard";
import Header from "../components/Header";
import { useTheme } from "../contexts/ThemeContext";

function MovieRow({
  title,
  movies,
  onMarkSeen,
  onDelete,
  onExpand,
  expandedMovieId,
}) {
  const scrollContainerRef = useRef(null);
  const { isDarkMode } = useTheme();

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-8">
      <h2
        className={`text-2xl font-bold mb-4 px-8 ${
          isDarkMode ? "text-white" : "text-gray-800"
        }`}
      >
        {title}
      </h2>
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 px-8 pb-4 scrollbar-hide"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMarkSeen={onMarkSeen}
              onDelete={onDelete}
              onExpand={onExpand}
              isExpanded={movie.id === expandedMovieId}
            />
          ))}
        </div>

        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-r opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ←
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-4 rounded-l opacity-0 group-hover:opacity-100 transition-opacity"
        >
          →
        </button>
      </div>
    </div>
  );
}

function Dashboard() {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Interstellar",
      image: "https://via.placeholder.com/200x300",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      seen: false,
      genre: "Action",
    },
    {
      id: 2,
      title: "The Martian",
      image: "https://via.placeholder.com/200x300",
      description:
        "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to survive.",
      seen: false,
      genre: "Anime",
    },
    {
      id: 3,
      title: "Gravity",
      image: "https://via.placeholder.com/200x300",
      description:
        "Two astronauts work together to survive after an accident leaves them stranded in space.",
      seen: true,
      genre: "Horror",
    },
    {
      id: 4,
      title: "Inception",
      image: "https://via.placeholder.com/200x300",
      description:
        "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea.",
      seen: false,
      genre: "Action",
    },
  ]);

  const handleMarkSeen = (id) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === id ? { ...movie, seen: true } : movie
      )
    );
    setExpandedMovieId(null);
  };

  const handleDelete = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    setExpandedMovieId(null);
  };

  const handleExpand = (id) => {
    setExpandedMovieId(id === expandedMovieId ? null : id);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsSearching(searchQuery !== "");
  }, [searchQuery]);

  const categories = {
    continueWatching: {
      title: "Action",
      movies: movies.filter((m) => m.genre === "Action"),
    },
    recommended: {
      title: "Anime",
      movies: movies.filter((m) => m.genre === "Anime"),
    },
    trending: {
      title: "Horror",
      movies: movies.filter((m) => m.genre === "Horror"),
    },
  };

  const expandedMovie = movies.find((movie) => movie.id === expandedMovieId);

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
                isDarkMode
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white border-gray-300"
              } focus:outline-none focus:border-blue-500`}
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Movies Grid */}
        {isSearching ? (
          <div className="flex flex-wrap justify-start gap-4 px-8">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onMarkSeen={handleMarkSeen}
                onDelete={handleDelete}
                onExpand={handleExpand}
                isExpanded={movie.id === expandedMovieId}
              />
            ))}
          </div>
        ) : (
          Object.entries(categories).map(([key, category]) => (
            <MovieRow
              key={key}
              title={category.title}
              movies={category.movies}
              onMarkSeen={handleMarkSeen}
              onDelete={handleDelete}
              onExpand={handleExpand}
              expandedMovieId={expandedMovieId}
            />
          ))
        )}
      </main>

      {/* Expanded Movie Card */}
      {expandedMovie && (
        <ExpandedMovieCard
          movie={expandedMovie}
          onMarkSeen={handleMarkSeen}
          onDelete={handleDelete}
          onCollapse={() => setExpandedMovieId(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
