import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ExpandedMovieAddCard from "./ExpandedMovieAddCard";

function MovieAddCard({ movie, onAddToWatchlist }) {
  const { isDarkMode } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true); // Open expanded view
  };

  const handleCollapse = () => {
    setIsExpanded(false); // Close expanded view
  };

  const handleAdd = () => {
    onAddToWatchlist(movie.movie_id); // Add to watchlist directly
  };

  return (
    <>
      {/* Main Movie Card */}
      <div className="relative flex-shrink-0 w-[250px] group transition-transform duration-300 hover:scale-105">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden shadow-md">
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {/* Expand Button */}
          <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleExpand}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
                isDarkMode
                  ? "bg-gray-800 bg-opacity-50 text-white"
                  : "bg-gray-300 bg-opacity-50 text-black"
              } hover:scale-110 shadow-md`}
              title="Expand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a.75.75 0 01-.53-.22l-4-4a.75.75 0 111.06-1.06L10 10.19l3.47-3.47a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-.53.22z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Add to Watchlist Button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAdd}
              className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
                isDarkMode
                  ? "bg-gray-800 bg-opacity-50 text-white"
                  : "bg-gray-300 bg-opacity-50 text-black"
              } hover:scale-110 shadow-md`}
              title="Add to Watchlist"
            >
              +
            </button>
          </div>
        </div>

        {/* Title */}
        <div
          className={`mt-2 text-center ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
          <p className="text-sm text-gray-500">{movie.year}</p>
        </div>
      </div>

      {/* Expanded Movie Add Card */}
      {isExpanded && (
        <ExpandedMovieAddCard
          movie={movie} // Pass correct movie data
          onCollapse={handleCollapse} // Collapse functionality
          onAddToWatchlist={onAddToWatchlist} // Forward add-to-watchlist functionality
        />
      )}
    </>
  );
}

export default MovieAddCard;
