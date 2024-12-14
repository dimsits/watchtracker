import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

function ExpandedMovieSeenCard({ movie, onCollapse, onAddReview, onUpdateReview }) {
  const { isDarkMode } = useTheme();
  const [rating, setRating] = useState(movie.userRating || 0); // Initialize with userRating if available
  const [hoverRating, setHoverRating] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10); // Slight delay for smooth animation
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false); // Trigger close animation
    setTimeout(() => onCollapse(), 300); // Delay collapse until animation completes
  };

  const handleRatingClick = (value) => {
    setRating(value);
    if (rating === 0) {
      onAddReview({
        movieId: movie.movie_id,
        rating: value,
      });
      alert("Rating submitted successfully!");
    } else {
      onUpdateReview({
        movieId: movie.movie_id,
        rating: value,
      });
      // alert("Rating updated successfully!");
    }
    handleClose();
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <div
        className={`relative w-[90%] max-w-4xl rounded-lg shadow-lg overflow-hidden transform ${
          isVisible ? "scale-100" : "scale-90"
        } transition-transform duration-300 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className={`absolute top-3 right-3 text-gray-400 hover:text-gray-600 ${
            isDarkMode ? "text-gray-300 hover:text-white" : ""
          }`}
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Poster */}
          <div className="w-full md:w-[40%] p-4 flex-shrink-0">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-auto max-h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-[60%] p-6 flex flex-col">
            {/* Title */}
            <h2
              className={`text-2xl md:text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {movie.title} ({movie.year || "N/A"})
            </h2>

            {/* IMDb Rating and Stars */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <span
                    key={index}
                    className={`text-xl ${
                      movie.imdb_rating / 2 > index
                        ? isDarkMode
                          ? "text-yellow-400"
                          : "text-yellow-600"
                        : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-400"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span
                className={`ml-3 font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                IMDb: {movie.imdb_rating || "N/A"}
              </span>
            </div>

            {/* Metadata */}
            <div className="mb-4 text-sm italic">
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Genre: {movie.genre || "N/A"} | Language: {movie.language || "N/A"}
              </p>
              <p
                className={`mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Country: {movie.country || "N/A"}
              </p>
            </div>

            {/* Plot */}
            <div className="mb-6">
              <h3
                className={`font-bold mb-1 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Plot:
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {movie.plot || "Description not available."}
              </p>
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
