import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function MovieCard({ movie, onMarkWatched, onDelete }) {
  const { isDarkMode } = useTheme(); // Use the theme context
  const [showMenu, setShowMenu] = useState(false);

  const handleWatched = () => {
    setShowMenu(false);
    onMarkWatched(movie.id);
  };

  const handleDelete = () => {
    setShowMenu(false);
    onDelete(movie.id);
  };

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

        {/* Three Dots Menu */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className={`hover:text-granite-medium focus:outline-none ${
              isDarkMode ? 'text-white' : 'text-granite-dark'
            }`}
          >
            &#8942; {/* Vertical three dots */}
          </button>

          {showMenu && (
            <div
              className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600'
                  : 'bg-white border-granite-light'
              } border`}
            >
              {!movie.watched && (
                <button
                  onClick={handleWatched}
                  className={`block w-full text-left px-4 py-2 transition ${
                    isDarkMode
                      ? 'text-white hover:bg-gray-600'
                      : 'text-granite-dark hover:bg-granite-light'
                  }`}
                >
                  Watched
                </button>
              )}
              <button
                onClick={handleDelete}
                className={`block w-full text-left px-4 py-2 transition ${
                  isDarkMode
                    ? 'text-red-400 hover:bg-gray-600'
                    : 'text-red-500 hover:bg-red-100'
                }`}
              >
                Delete
              </button>
            </div>
          )}
        </div>
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

export default MovieCard;
