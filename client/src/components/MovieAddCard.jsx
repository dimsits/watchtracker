import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ExpandedMovieAddCard from "./ExpandedMovieAddCard";

function MovieAddCard({ movie, onAddToWatchlist }) {
  const { isDarkMode } = useTheme();
  const [hovered, setHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleAdd = () => {
    console.log("Adding movie with ID:", movie.movie_id); // Debug
    onAddToWatchlist(movie.movie_id);
  };

  // Debug: Log the movie object to ensure all fields are present
  console.log(movie);

  return (
    <>
      {/* Main Movie Card */}
      <div className="relative flex-shrink-0 w-[200px] group transition-transform duration-300 hover:scale-105">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] rounded-md overflow-hidden">
          <img
            src={movie.poster_url} // Ensure correct field is used
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Add to Watchlist Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAdd}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition ${
              isDarkMode
                ? "bg-gray-800 bg-opacity-50 text-white"
                : "bg-gray-300 bg-opacity-50 text-black"
            } hover:scale-110 shadow-md`}
            title="Add to Watchlist"
          >
            +
          </button>

          {/* Tooltip */}
          {hovered && (
            <span
              className={`absolute bottom-[3rem] right-0 px-2 py-1 text-sm rounded-md shadow-lg ${
                isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
              }`}
            >
              Add to Watchlist?
            </span>
          )}
        </div>

        {/* Expand Button */}
        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        {/* Title and Description */}
        <div
          className={`p-4 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
        >
          <h3
            className={`text-lg font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-granite-dark"
            }`}
          >
            {movie.title}
          </h3>
          <p
            className={`text-sm line-clamp-2 ${
              isDarkMode ? "text-gray-300" : "text-granite-medium"
            }`}
          >
            {movie.description}
          </p>
        </div>
      </div>

      {/* Expanded Movie Add Card */}
      {isExpanded && (
        <ExpandedMovieAddCard
          movie={ movie } // Ensure all fields are passed properly
          onCollapse={handleCollapse}
          onAddToWatchlist={onAddToWatchlist}
        />
      )}
    </>
  );
}

export default MovieAddCard;
