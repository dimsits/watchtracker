import { useTheme } from "../contexts/ThemeContext";

function ExpandedMovieCard({ movie, onMarkSeen, onDelete, onCollapse }) {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <div
        className={`relative max-w-4xl w-full rounded-lg shadow-lg overflow-hidden ${
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

        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3 p-6 flex flex-col justify-between">
            {/* Title and Genre */}
            <div>
              <h2
                className={`text-3xl font-bold mb-2 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {movie.title}
              </h2>
              <p
                className={`text-sm mb-4 font-semibold ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {movie.genre}
              </p>
            </div>

            {/* Cast, Description */}
            <div>
              <p
                className={`text-sm mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Cast:{" "}
                <span className="font-medium">
                  {movie.cast || "Information not available"}
                </span>
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {movie.description || "Description not available"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-6">
  <button
    onClick={() => onMarkSeen(movie.id)}
    className={`px-6 py-2 rounded-md font-semibold text-sm transition ${
      isDarkMode
        ? "bg-darkGranite-button hover:bg-darkGranite-hover text-granite-softWhite"
        : "bg-granite-medium hover:bg-granite-light text-granite-softWhite"
    }`}
  >
    Add to Seen
  </button>
  <button
    onClick={() => onDelete(movie.id)}
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
