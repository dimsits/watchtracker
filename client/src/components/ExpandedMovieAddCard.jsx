import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function ExpandedMovieSeenCard({ movie, onCollapse, onAddReview, onUpdateReview }) {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(movie.userRating || 0); // Initialize with userRating if available
  const [hoverRating, setHoverRating] = useState(0);

  // Disable background scrolling when the card is open
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleRatingClick = (value) => {
    if (movie.userRating) {
      // If there's already a review, update it
      onUpdateReview({
        movieId: movie.movie_id,
        rating: value,
      });
      alert("Rating updated successfully!");
    } else {
      // If no review exists, add a new one
      onAddReview({
        movieId: movie.movie_id,
        rating: value,
      });
      alert("Rating submitted successfully!");
    }
    setRating(value); // Update the local state
    onCollapse(); // Close the expanded card
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

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

            {/* Stars and Average Rating */}
            <div className="flex items-center mb-2">
              <span
                className={`text-lg font-medium ${
                  isDarkMode ? "text-yellow-400" : "text-yellow-600"
                }`}
              >
                ★ IMDb: {movie.imdb_rating || "N/A"}
              </span>
              <span
                className={`ml-4 text-lg font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Average Rating: {movie.average_rating !== undefined ? movie.average_rating : "N/A"} / 5
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

            {/* Interactive Rating */}
            <div className="mb-4">
              <p className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Rate this movie:
              </p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    className={`text-2xl transition ${
                      star <= (hoverRating || rating)
                        ? isDarkMode
                          ? "text-yellow-400"
                          : "text-yellow-600"
                        : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpandedMovieSeenCard;
