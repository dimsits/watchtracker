import { useState, useRef, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

function MovieCard({ movie, onMarkSeen, onDelete, onExpand }) {
  const { isDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleSeen = () => {
    onMarkSeen(movie.id);
    setShowMenu(false);
  };

  const handleDelete = () => {
    onDelete(movie.id);
    setShowMenu(false);
  };

  const handleExpand = () => {
    onExpand(movie.id);
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  return (
    <div className="relative flex-shrink-0 w-[200px] transition-transform duration-300 hover:scale-105">
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] rounded-md overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Three Dots Menu */}
      <div className="absolute bottom-4 right-4" ref={dropdownRef}>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className={`hover:text-granite-medium focus:outline-none ${
            isDarkMode ? "text-white" : "text-granite-dark"
          }`}
        >
          &#8942; {/* Vertical three dots */}
        </button>

        {showMenu && (
          <div
            className={`absolute bottom-full mb-2 right-0 w-28 rounded-md shadow-lg ${
              isDarkMode
                ? "bg-gray-700 border-gray-600"
                : "bg-white border-granite-light"
            } border`}
          >
            {!movie.watched && (
              <button
                onClick={handleSeen}
                className={`block w-full text-left px-3 py-1.5 text-sm transition ${
                  isDarkMode
                    ? "text-white hover:bg-gray-600"
                    : "text-granite-dark hover:bg-granite-light"
                }`}
              >
                Watched
              </button>
            )}
            <button
              onClick={handleDelete}
              className={`block w-full text-left px-3 py-1.5 text-sm transition ${
                isDarkMode
                  ? "text-red-400 hover:bg-gray-600"
                  : "text-red-500 hover:bg-red-100"
              }`}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Expand Button */}
      <div className="absolute bottom-4 left-4">
        <button
          onClick={handleExpand}
          className={`hover:text-granite-medium focus:outline-none ${
            isDarkMode ? "text-white" : "text-granite-dark"
          }`}
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
    </div>
  );
}

export default MovieCard;
