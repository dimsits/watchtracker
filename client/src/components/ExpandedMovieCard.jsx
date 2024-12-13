import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

function ExpandedMovieCard({ movie, onMarkSeen, onDelete, onCollapse }) {
  const { isDarkMode } = useTheme();

  // Disable background scrolling when the card is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`relative w-full max-w-5xl rounded-lg shadow-lg overflow-hidden ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onCollapse}
          className={`absolute top-3 right-3 text-gray-400 hover:text-gray-600 ${
            isDarkMode ? "text-gray-300 hover:text-white" : ""
          }`}
        >
          ✕
        </button>

        <div className="flex">
          {/* Poster */}
          <div className="w-[40%] p-4">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-auto max-h-[600px] object-contain rounded"
            />
          </div>

          {/* Movie Details */}
          <div className="w-[60%] p-6 flex flex-col">
            {/* Title and Year */}
            <div className="mb-3">
              <h2
                className={`text-3xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {movie.title} ({movie.year || "N/A"})
              </h2>
            </div>

            {/* Stars and Likes */}
            <div className="flex items-center mb-2">
              <span
                className={`text-lg font-medium ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                ★ {movie.imdb_rating || "N/A"}
              </span>
              <span
                className={`ml-4 text-lg font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Likes: {movie.like_count || "0"}
              </span>
            </div>

            {/* Genre, Country, Language */}
            <div className="mb-4">
              <p
                className={`text-sm italic ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {movie.genre || "N/A"}, {movie.country || "N/A"}, {movie.language || "N/A"}
              </p>
            </div>

            {/* Plot */}
            <div className="mb-6">
              <p
                className={`text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Plot:
              </p>
              <div
                className="text-sm overflow-y-auto max-h-[250px] pr-2"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: isDarkMode
                    ? "rgba(255,255,255,0.7) rgba(0,0,0,0.3)"
                    : "rgba(0,0,0,0.7) rgba(255,255,255,0.3)",
                }}
              >
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {movie.plot || "Description not available"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => onMarkSeen(movie.movie_id)}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition ${
                  isDarkMode
                    ? "bg-darkGranite-button hover:bg-darkGranite-hover text-granite-softWhite"
                    : "bg-granite-medium hover:bg-granite-light text-granite-softWhite"
                }`}
              >
                Add to Seen
              </button>
              <button
                onClick={() => onDelete(movie.movie_id)}
                className={`px-6 py-2 rounded-md font-semibold text-sm transition ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-granite-softWhite"
                    : "bg-gray-300 hover:bg-gray-400 text-granite-softWhite"
                }`}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedMovieCard;
