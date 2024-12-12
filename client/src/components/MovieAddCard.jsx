import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function MovieAddCard({ movie, onAddToWatchlist }) {
  const { isDarkMode } = useTheme();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-[300px] object-cover"
        />

        {/* Add to Watchlist Button */}
        <button
          onClick={() => onAddToWatchlist(movie.id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`absolute bottom-4 right-4 text-xl font-bold ${
            isDarkMode
              ? 'text-white hover:text-blue-400'
              : 'text-granite-dark hover:text-blue-600'
          } transition duration-300`}
        >
          +
        </button>

        {/* Tooltip */}
        {hovered && (
          <span
            className={`absolute bottom-16 right-4 px-2 py-1 text-sm rounded-md ${
              isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-300 text-black'
            } shadow-lg`}
          >
            Add to Watchlist?
          </span>
        )}
      </div>
      <div className="p-4">
        <h3
          className={`text-lg font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-granite-dark'
          }`}
        >
          {movie.title}
        </h3>
        <p
          className={`text-sm line-clamp-2 ${
            isDarkMode ? 'text-gray-300' : 'text-granite-medium'
          }`}
        >
          {movie.description}
        </p>
      </div>
    </div>
  );
}

export default MovieAddCard;
